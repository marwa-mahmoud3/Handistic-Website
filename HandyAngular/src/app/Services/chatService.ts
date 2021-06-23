import { MessageModel } from '../Models/MessageModel';
import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';         
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

   private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:44339/chathub")  
                            .configureLogging(signalR.LogLevel.Information).build();
                            
   readonly POST_URL = "https://localhost:44339/api/chat/send"

  private receivedMessageObject: MessageModel = new MessageModel('','','');
  private sharedObj = new Subject<MessageModel>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (user, message) => { this.mapReceivedMessage(user, message); });
   console.log(this.connection)
   sessionStorage.setItem('conectionId', this.connection.connectionId);
   this.start();                 
  }

  public async start() {
    try {
      await this.connection.start();
    } catch (err) {
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
 }

  public broadcastMessage(msgDto: any) {
    let connectionId = sessionStorage.getItem('conectionId');
    let msg=new MessageModel(msgDto.user,msgDto.msgText,connectionId)
    this.http.post(this.POST_URL, msg).subscribe();
  }

  public retrieveMappedObject(): Observable<MessageModel> {
    return this.sharedObj.asObservable();
  }


}
