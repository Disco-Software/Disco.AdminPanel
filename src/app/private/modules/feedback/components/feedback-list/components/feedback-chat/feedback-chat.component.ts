import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as signalR from '@microsoft/signalr';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {MessageHeaders } from '@microsoft/signalr';
import { httpLoaderFactory } from '../../../../../../../app.module';
import { getUserAgentHeader } from '@microsoft/signalr/dist/esm/Utils';

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements AfterViewInit {
  @ViewChild('chatBlock', { static: false }) chatBlock: ElementRef;

  private hubConnection: signalR.HubConnection | undefined;
  public messages: any[] = [];

  statuses = [
    'feedback.table.body.status.open',
    'feedback.table.body.status.inProgress',
    'feedback.table.body.status.closed',
  ];
  status: string = this.statuses[2]

  constructor(private _activeModal: NgbActiveModal) {
    this.startSignalRConnection();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const chatBlockElement = this.chatBlock.nativeElement;
    chatBlockElement.scrollTop = chatBlockElement.scrollHeight;
  }

  public onClose(): void {
    this._activeModal.close();
  }

  private startSignalRConnection(): void {
    const headers: MessageHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Methods' : 'ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL',
      'Access-Control-Allow-Headers' : 'Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If',
      'Access-Control-Expose-Headers' : 'DAV, content-length, Allow'
    };

    const httpConnectionOptions : signalR.IHttpConnectionOptions = {
      headers: headers,
      accessTokenFactory : () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcwNzMyNDcwMCwiZXhwIjoxNzA3Mzk2NzAwLCJpc3MiOiJkaXNjby1hcGkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0L0Rpc2NvLkFwaSJ9.Sxd47rzXm1WPq5RAI_SocqbR1bIsAuf2i-_qHGKCAx0',
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub/ticket', httpConnectionOptions)
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.log('Error while starting SignalR connection: ', err));

    this.hubConnection.on('ReceiveMessage', (message: any) => {
      console.log('Received message: ', message);
      this.messages.push(message);
    });
    fetch("http://localhost:5000/hub/ticket", {
      mode: 'no-cors'
  }).then(response => {
      // Handle the response here
  }).catch(error => {
      // Handle any errors here
  });  }

  // public startChat(): void {
  //   if (this.tempUserName) {
  //     this.userName = this.tempUserName;
  //     this.tempUserName = '';
  //   }
  // }

  public sendMessage(): void {
    const message = 'TEST MESSAGE'
    if (message) {
      const chatMessage = {
        sender: 'Olena',
        content: message
      };
      this.hubConnection?.invoke('SendMessage', chatMessage)
        .catch(err => console.error('Error while sending message: ', err));

    }
  }

}
