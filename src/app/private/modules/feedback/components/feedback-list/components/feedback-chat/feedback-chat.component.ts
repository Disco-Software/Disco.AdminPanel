import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatBlock') chatBlock: ElementRef;
  @ViewChild(InputComponent) inputComponent: InputComponent;

  @Output() closeWindowEmitter = new EventEmitter()

  @Input() ticket: FeedbackInterface;
  @Input() message : string;
  @Input() isOpen : boolean = true;

  @Select(FeedbackState.isLoadingSelector) isLoading$: Observable<boolean>;
  isLoading: boolean = true;
  isSendingMessage = false;
  isEdit : boolean = false;

  private hubConnection: signalR.HubConnection | undefined;
  public messages: any[] = [];
  public messageDates: string[] = [];
  test: any[] = [];
  protected selectedContextMenuItem: any;

  protected contextMenuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      iconClass: 'text-white me-3',
      command: (id: number): void => {
        this.isEdit = true
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      iconClass: 'text-white me-3',
      command: (): void => {
        this.hubConnection.invoke('delete-for-all', this.selectedContextMenuItem.id).then((): void => {

          this.messages = this.messages.map(message => {
            if (message.id === this.selectedContextMenuItem.id) {
                return {
                    ...message,
                    isRemoving: true
                };
            }
          });
          console.log(this.messages)
          setTimeout(() => {
            this.messages = this.messages.map(message => {
              if (message.id === this.selectedContextMenuItem.id) {
                  return {
                      ...message,
                      isRemoving: false
                  };
              }
            })
            console.log(this.messages)
          }, 1000);
        });
      },
    },
  ];

  statuses = [
    'feedback.table.body.status.open',
    'feedback.table.body.status.in progress',
    'feedback.table.body.status.closed',
  ];
  status: string;
  myUser: User;
  isRemoving: boolean = false;

  constructor(private _activeModal: NgbActiveModal, private lsService: LocalStorageService, private store: Store, private cdr: ChangeDetectorRef) {
    console.log(this.isOpen);
    console.log(this.isRemoving)
  }

  protected test2() {
    console.log('close')
  }

  ngOnInit(): void {
    this.myUser = this.lsService.getItem('user').userName;
    this.status = this.statuses.find(status => status.includes(this.ticket.status.toLowerCase()));

    this.startSignalRConnection();
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
    this.isOpen = false;
    setTimeout(x => {
      this._activeModal.close();
      this.closeWindowEmitter.emit();
    }, 500);
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
          pageSize: 500,
        }
        this.getAllMessages(req);
      })
      .catch(err => null);

    this.subscribeMessages();

    this.subscribeStatuses();

    this.subscribeRemoveMessages();
  }

  getAllMessages(req: any): void {
    this.store.dispatch(new GetFeedbackMessagesAction(req)).pipe(take(1), map(state => state.FeedbackState.messages)).subscribe(res => {
      this.messages = res;
      this.generateMapDates()
      this.isLoading = false;
      setTimeout(() => {
        this.scrollToBottom();
      });

    })
  }

  subscribeMessages(): void {
    this.hubConnection.on('receive', (message: any) => {
      this.messages = [
        ...this.messages,
        message
      ];
      this.generateMapDates();
      setTimeout((): void => {
        this.scrollToBottom();
        this.isSendingMessage = false;
      });
    });
  }

  subscribeStatuses(): void {
    this.hubConnection.on('changeStatus', (status: string): void => {
      this.status = this.statuses.find(statusItem => {
        return statusItem.includes(status.toLowerCase())
      });
    });
  }

  subscribeRemoveMessages(): void {
    this.hubConnection.on('remove', (id: number): void => {
      this.isRemoving = true;
      setTimeout(x => {
        this.messages = this.messages.filter(message=>message.id !== id);
        this.generateMapDates();
        this.isRemoving = false;
      }, 1000);
    })
  }

  generateMapDates(): void {
    this.messageDates = this.messages.map(message =>
      message.createdDate ?
        message.createdDate.split('T')[0] : message.created.split('T')[0]
    );
    this.messageDates = this.messageDates.filter((value, index) => this.messageDates.indexOf(value) === index)
  }

  public filterMessagesByDate(date: string): any[] {
    return this.messages.filter(message =>
      message.createdDate ? message.createdDate?.includes(date) : message.created?.includes(date)
    );
  }

  public sendMessage(search : string): void {
    if (search) {
      this.isSendingMessage = true;
      const chatMessage : MessageRequestInterface = {
        message: search,
        ticketName: this.ticket.name,
        ticketId: this.ticket.id
      };

      this.hubConnection?.invoke('send', chatMessage.message, chatMessage.ticketName, chatMessage.ticketId)
        .then((res) => {
          this.inputComponent.clearMessageString();

          setTimeout((): void => {
            this.inputComponent.focusInput();
          })
        })
        .catch(err => null);
    }
  }

  changeStatus(event: any): void {
    const status: any = {
      id: this.ticket.id,
      status: event.value.split('status.')[1],
    };

    this.hubConnection?.invoke('updateStatus', status.id, status.status)
      .then((res) => {
        console.log('successful status change')
      })
      .catch(err => null);

  }
  getTime(date: string): string {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();

    let period = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // Година 0 в 12-годинному форматі - 12 година

    return hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + period;
  }

  ngOnDestroy(): void {
    this.hubConnection.stop();
  }

}
