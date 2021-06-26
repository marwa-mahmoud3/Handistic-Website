import { Users } from './../Models/Users';
import { UserService } from 'src/app/Services/user.service';
import { MessageModel } from './../Models/MessageModel';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chatService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService,private uerService :UserService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageModel) => { this.addToInbox(receivedObj);});  
    this.uerService.getUserNameByUserId(localStorage.getItem('userId')).subscribe((data=>{
      this.CurrentUser = data
      this.msgDto.user = this.CurrentUser.userName
    }))                                               
  }

  msgDto: MessageModel = new MessageModel('','','');
  msgInboxArray: MessageModel[] = [];
  CurrentUser :Users
  MessagesList:MessageModel[]=[]
  map = new Map<string, string>();
  send(): void {
   
      if(this.msgDto) {
        if(this.msgDto.user.length == 0){
          window.alert("field is required");
          return;
        } else {
          this.chatService.broadcastMessage(this.msgDto);                
          this.msgDto.msgText = '';
        }
      }
     

  }

  addToInbox(obj: MessageModel) {
    let newObj = new MessageModel('','','');
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);
    if(this.map[newObj.user]!=newObj.msgText)
      {
        this.map.set(newObj.user,newObj.msgText ); 
      }

  }
}
