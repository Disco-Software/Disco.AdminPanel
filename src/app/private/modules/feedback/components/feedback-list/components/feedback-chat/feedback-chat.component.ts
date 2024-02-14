import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as signalR from '@microsoft/signalr';
import {MessageHeaders} from '@microsoft/signalr';
import {FeedbackInterface, FeedbackState, GetFeedbackMessagesAction, LocalStorageService} from "@core";
import {Select, Store} from "@ngxs/store";
import {map, Observable, take} from "rxjs";
import {MessageRequestInterface} from 'src/app/core/models/ticket-chat/message-request.interface';
import {environment} from "../../../../../../../../environments/environment";
import {User} from "../../../../../../../core/models/account/change-email-response.model";
import {InputComponent} from "@shared";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chatBlock') chatBlock: ElementRef;
  @ViewChild(InputComponent) inputComponent: InputComponent;


  @Input() ticket: FeedbackInterface;
  @Input() message : string;

  @Select(FeedbackState.isLoadingSelector) isLoading$: Observable<boolean>;
  isLoading = true;

  private hubConnection: signalR.HubConnection | undefined;
  public messages: any[] = [];

  statuses = [
    'feedback.table.body.status.open',
    'feedback.table.body.status.inProgress',
    'feedback.table.body.status.closed',
  ];
  status: string = this.statuses[2];
  myUser: User;

  constructor(private _activeModal: NgbActiveModal, private lsService: LocalStorageService, private store: Store, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.myUser = this.lsService.getItem('user').userName
    this.startSignalRConnection();
  }

  ngAfterViewInit(): void {
  }

  public scrollToBottom(): void {
    const chatBlockElement = this.chatBlock.nativeElement;
    chatBlockElement.scrollTop = Math.max(
      chatBlockElement.scrollHeight,
      chatBlockElement.offsetHeight,
      chatBlockElement.clientHeight,
    )
  }

  public onClose(): void {
    this._activeModal.close();
  }

  private startSignalRConnection(): void {
    const user = this.lsService.getItem('user');
    const accessToken = this.lsService.getString('accessToken');

    const headers : MessageHeaders = {
      //"Content-Type" : "application/json",
      "Connection" : "Upgrade",
      "Upgrade" : "websocket",
      "Sec-WebSocket-Version" : "13",
      "Sec-WebSocket-Extensions" : "permessage-deflate; client_max_window_bits",
      "User-Agent" : navigator.userAgent,
    }

    const httpConnectionOptions : signalR.IHttpConnectionOptions = {
      headers: headers,
      withCredentials: false,
      accessTokenFactory : () => accessToken,
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${environment.server}/hub/ticket?ticketName=${this.ticket.name}&userName=${user.userName}`,
        httpConnectionOptions
      )
      .build();

    this.hubConnection.start()
      .then(() => {
        const req = {
          groupId: this.ticket.id,
          userId: user.id,
          pageNumber: 1,
          pageSize: 50,
        }
        this.store.dispatch(new GetFeedbackMessagesAction(req)).pipe(take(1), map(state=> state.FeedbackState.messages)).subscribe(res=>{
          this.messages = res;
          this.isLoading = false;
          setTimeout(() => {
            this.scrollToBottom();
          });
        })
      })
      .catch(err => console.log('Error while starting SignalR connection: ', err));

    this.hubConnection.on('receive', (message: any) => {
      this.messages = [
        ...this.messages,
        message
      ];
      setTimeout(()=> this.scrollToBottom())
    });
  }

  public sendMessage(search : string): void {
    if (search) {
      const chatMessage : MessageRequestInterface = {
        message: search,
        ticketName: this.ticket.name,
        ticketId: this.ticket.id
      };

      this.hubConnection?.invoke('send', chatMessage.message, chatMessage.ticketName, chatMessage.ticketId)
        .then((res) => {
          this.inputComponent.clearMessageString();

        })
        .catch(err => console.error('Error while sending message: ', err));
    }
  }

  getTime(date: string) {
// Отримання годин та хвилин
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();

// Визначення періоду доби (AM або PM)
    var period = hours >= 12 ? "pm" : "am";

// Конвертація годин у 12-годинний формат
    hours = hours % 12;
    hours = hours ? hours : 12; // Година 0 в 12-годинному форматі - 12 година

// Форматування відповідно до потрібного формату
    return hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + period;
  }

  ngOnDestroy(): void {
    this.hubConnection.stop();
  }

}
