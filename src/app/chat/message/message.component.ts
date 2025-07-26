import { Component, ElementRef, HostListener, inject, input, OnChanges, OnInit, output, signal, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AddMessage } from '../models/add-message.model';
import { ChatService } from '../service/chat-service';
import { DiscusionComponent } from '../discussion/discussion.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [FormsModule, ReactiveFormsModule, DiscusionComponent, CommonModule, NgOptimizedImage],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.decetChangeFrom();
  }

  sideBarState = output<Boolean>();
  reponseState = true;
  message = new AddMessage();
  noQuestionSendState: Boolean = false;
  chatService = inject(ChatService)
  welcomeMessage = signal<string>('Try to connecting...')
  allMessage = signal<AddMessage[]>([])
  private formBuilder = inject(FormBuilder)
  formGroup!: FormGroup;
  messageCtrl!: FormControl;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  imagePreview: string | null = null;
  file !: File;
  imageCtl = new FormControl;
  sessionId = input<number>();
  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTo({ top: this.scrollContainer.nativeElement.scrollHeight, behavior: 'smooth' });
  }

  incrementSesion(): number {
    const currentSession = this.chatService.currentSession();
    const newSession = currentSession + 1;
    localStorage.setItem('nandra-session', newSession.toString())
    return newSession;
  }


    welcome() {
      this.reponseState = true;
      this.chatService.welcome().pipe(
        catchError((e) => {
          console.error('Erreur lors de la récupération du message:', e);
          this.reponseState = false; 
          this.welcomeMessage.set('erreur de connexion');
           this.noQuestionSendState = false;
          return of({ message: 'Une erreur est survenue' });
        })
      ).subscribe((data: any) => {
        this.welcomeMessage.set(data.message);
        this.noQuestionSendState = false;
        this.reponseState = false;
      });
    }


  ngOnInit(): void {
    this.welcome();
    this.initForm();
    localStorage.setItem('themeState', 'no')
  }


  initForm() {
    this.imageCtl;
    this.messageCtrl = this.formBuilder.control('');
    this.messageCtrl.addValidators([Validators.required])
    this.formGroup = this.formBuilder.group({
      message: this.messageCtrl
    })
  }
  gererTouche(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey && this.formGroup.valid) {
      event.preventDefault();
      if (this.imagePreview) {
        this.sendQuestionWithImage();
      } else {
        this.SendQuestion();
      }
    }
  }

  SendQuestion() {
    this.scrollToBottom();
    this.noQuestionSendState = true;
    this.reponseState = true;
    const question = this.formGroup.value.message;
    const newDiscusion = new AddMessage;
    newDiscusion.question = question;

    this.message.session = this.chatService.currentSession() + 1;
    this.message.question = question;
    localStorage.setItem("nandra-session", this.message.session.toString());

    this.formGroup.reset();

    this.allMessage.update(messages => [...messages, newDiscusion]);
    this.chatService.askQuestion(this.message).subscribe((data: any) => {
      // 🛠 Mettre à jour la dernière discussion avec la réponse
      this.allMessage.update(messages => {
        const lastIndex = messages.length - 1;
        const updatedMessages = [...messages];

        // Mettre à jour l'objet à la fin du tableau
        updatedMessages[lastIndex] = {
          ...updatedMessages[lastIndex],
          response: data
        };
        this.reponseState = false;
        return updatedMessages;
      });
    });
  }
  sendQuestionWithImage() {
    this.scrollToBottom();
    this.noQuestionSendState = true;
    this.reponseState = true;
    this.imagePreview = null;
    const file = this.file; // Assure-toi que ce champ est bien défini quelque part
    const question = this.formGroup.value.message;

    const newMessage = new AddMessage();
    newMessage.question = question;

    const session = this.chatService.currentSession() + 1;
    newMessage.session = session;
    this.message.session = session;
    this.message.question = question;
    localStorage.setItem("nandra-session", session.toString());
    this.chatService.AddMessage(this.message).subscribe();
    this.allMessage.update(messages => [...messages, newMessage]);

    this.chatService.sendQuestionWithImage({ question, image: file }).subscribe(
      (data: any) => {
        // 🛠 Mets à jour le message avec la réponse
        this.allMessage.update(messages => {
          const lastIndex = messages.length - 1;
          const updatedMessages = [...messages];
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            response: data.message || data, // selon ta structure
          };
          return updatedMessages;
        });
        this.reponseState = false;
      }
    );

    this.formGroup.reset();
  }

  toogleSideBar() {
    this.sideBarState.emit(true)
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file = file;
      console.log(input.files[0].webkitRelativePath);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        console.log(this.imagePreview);

      };
      reader.readAsDataURL(file);
    }
  }

  decetChangeFrom() {
    this.noQuestionSendState = true;
    this.reponseState = true;
    const currentSessionId = this.sessionId(); // 👈 lire la valeur du signal
  
    if(currentSessionId==0){
     const session =  localStorage.getItem('nandra-session')
     this.allMessage.set([]);
     const id = session!=undefined?parseInt(session) + 1:1;
     localStorage.setItem('nandra-session',id.toString());
     localStorage.setItem('themeState','no');
     this.reponseState = false;
    }  else{
            const id = currentSessionId !== undefined ? currentSessionId : 1;
    if (id) {
      this.chatService.getAllMessageBysession(id).subscribe((data: any) => {
        const allM = data.messages;
        console.log(allM);
        this.reponseState = false;
        // this.allMessageBySession.set(allM); // à activer si tu veux stocker dans un signal
        // this.allMessage.update();
        this.allMessage.set(allM);
        this.incrementSesion()
      });
    }
    }

  }

  @HostListener('focusin', ['$event.target'])
  onFocusInput(element: HTMLElement) {
    setTimeout(() => {
      console.log(true);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}