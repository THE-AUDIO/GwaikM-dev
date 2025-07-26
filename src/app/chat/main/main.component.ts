import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { MessageComponent } from "../message/message.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [SideBarComponent, MessageComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  sessionId!:number;
  getSessionState(id:number){
    this.sessionId = id;
  }
  sideBarState:Boolean = false;
  tooglesideBar(state:Boolean){
      this.sideBarState = state;
  }
  
}