import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ChatService } from '../service/chat-service';
import { DiscusionModel } from '../models/discussion.models';

@Component({
  selector: 'app-discusion',
  imports: [CommonModule,MarkdownModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscusionComponent implements OnChanges{

  chatService = inject(ChatService)
  discussion = input<DiscusionModel>({} as DiscusionModel)
  reponse = signal<string>('')

  responsTypingEffect() {
  const response = this.discussion().response;
  this.reponse.set(''); // réinitialiser avant animation

  for (let i = 0; i < response.length; i++) {
    setTimeout(() => {
      this.reponse.update(value => value + response[i]);
    }, 40 * i); // délai progressif : 30ms par caractère
  }
}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.discussion().response){
      this.responsTypingEffect() 
    }
  }
}