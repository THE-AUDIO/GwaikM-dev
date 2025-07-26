import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ChatService } from '../service/chat-service';
import { TruncatePipe } from '../../truncate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [FormsModule, ReactiveFormsModule, TruncatePipe,MarkdownModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  private chatService = inject(ChatService)
  allTheme = this.chatService.allTheme;
  sessionState = output<number>();
  ngOnInit(): void {
    this.initTheme();
    this.chatService.getAllTheme()
  }
  sideBarState = output<Boolean>();
  options = ['humour', 'science',];
  themeCtl = new FormControl('humour');
  initTheme(){
    this.themeCtl.addValidators([Validators.required])
  }
  toogleSideBar(){
    this.sideBarState.emit(false)
  }
  clickHistoric(id:number){
    console.log(id);
    this.toogleSideBar()
    this.sessionState.emit(id + 1);
  }

  newChat(){
    this.sessionState.emit(0);
  }

}