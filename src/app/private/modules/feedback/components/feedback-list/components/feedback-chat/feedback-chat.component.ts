import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as signalR from '@microsoft/signalr';
import {MessageHeaders} from '@microsoft/signalr';
import {LocalStorageService} from "@core";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatBlock', { static: false }) chatBlock: ElementRef;

  @Input() ticketName: string;

  private hubConnection: signalR.HubConnection | undefined;
  public messages: any[] = [];

  statuses = [
    'feedback.table.body.status.open',
    'feedback.table.body.status.inProgress',
    'feedback.table.body.status.closed',
  ];
  status: string = this.statuses[2]

  constructor(private _activeModal: NgbActiveModal, private lsService: LocalStorageService) {
  }

  ngOnInit(): void {
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

    const userName = this.lsService.getItem('user').userName;

    const httpConnectionOptions : signalR.IHttpConnectionOptions = {
      withCredentials: false,
      accessTokenFactory : () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcwNzMyNDcwMCwiZXhwIjoxNzA3Mzk2NzAwLCJpc3MiOiJkaXNjby1hcGkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0L0Rpc2NvLkFwaSJ9.Sxd47rzXm1WPq5RAI_SocqbR1bIsAuf2i-_qHGKCAx0',
    }


    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://devdiscoapi.azurewebsites.net/hub/ticket?userName=${userName}&ticketName=${this.ticketName}`, httpConnectionOptions)
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.log('Error while starting SignalR connection: ', err));

    this.hubConnection.on('ReceiveMessage', (message: any) => {
      console.log('Received message: ', message);
      this.messages.push(message);
    });
  }

  public sendMessage(): void {
    const message = 'TEST MESSAGE'
    if (message) {
      const chatMessage = {
        sender: 1,
        content: message
      };
      this.hubConnection?.invoke('SendMessage', chatMessage)
        .catch(err => console.error('Error while sending message: ', err));

    }
  }

}
