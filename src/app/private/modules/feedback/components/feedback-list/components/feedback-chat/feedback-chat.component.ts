import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as signalR from '@microsoft/signalr';

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
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/api/hub/ticket',)
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.log('Error while starting SignalR connection: ', err));

    this.hubConnection.on('ReceiveMessage', (message: any) => {
      console.log('Received message: ', message);
      this.messages.push(message);
    });
  }

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
