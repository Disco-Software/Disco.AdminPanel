import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as signalR from '@microsoft/signalr';
import {MessageHeaders} from '@microsoft/signalr';

import {Store} from '@ngxs/store';
import {map, Observable, switchMap, take} from 'rxjs';
import {MessageRequestInterface} from 'src/app/core/models/ticket-chat/message-request.interface';
import {environment} from '../../../../../../../../environments/environment';
import {User} from '../../../../../../../core/models/account/change-email-response.model';
import {InputComponent} from '@shared';
import {MenuItem} from 'primeng/api';
import {FeedbackInterface} from "@core/models";
import {GetFeedbackMessagesAction, GetFeedbackMessagesCountAction} from "@core/states";
import {DateTimeService, LocalStorageService} from "@core/services";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss'],
})
export class FeedbackChatComponent implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('chatBlock') chatBlock: ElementRef;
  @ViewChild(InputComponent) inputComponent: InputComponent;

  @Output() closeWindowEmitter = new EventEmitter();

  @Input() public ticket: FeedbackInterface;
  @Input() public message: string;
  @Input() public isOpen: boolean = true;

  protected isLoading: boolean = true;
  protected isSendingMessage: boolean = false;
  protected editableMessage: any;
  private deletableMessage: any;

  private pagination = {
    currentPage: 1,
    itemsPerPage: 50
  }
  private loading: boolean = false;
  private user: any;
  private totalMessagesCount: number = 0;

  private hubConnection: signalR.HubConnection | undefined;
  private messages: any[] = [];
  protected messageDates: string[] = [];
  protected selectedContextMenuItem: any;

  protected myContextMenuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      iconClass: 'text-white me-3',
      command: (): void => {
        this.editableMessage = this.selectedContextMenuItem;
        this.selectedContextMenuItem = null;
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      iconClass: 'text-white me-3',
      command: (): void => {
        this.deletableMessage = this.selectedContextMenuItem;
        this.selectedContextMenuItem = null;
        this.hubConnection
          .invoke('delete-for-all', this.deletableMessage.id)
          .then((): void => {
            if (this.deletableMessage) {
              this.messages = this.messages.map((message): any => {
                if (message.id === this.deletableMessage.id) {
                  return {
                    ...message,
                    isRemoving: true,
                  };
                } else {
                  return message;
                }
              });
              setTimeout((): void => {
                this.messages = this.messages.map((message) => {
                  if (message.id === this.deletableMessage.id) {
                    return {
                      ...message,
                      isRemoving: false,
                    };
                  } else {
                    return message;
                  }
                });
                this.selectedContextMenuItem = null;
              }, 1000);
            }
          });
      },
    },
  ];

  protected companionContextMenuItems: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      iconClass: 'text-white me-3',
      command: (): void => {
        this.hubConnection
          .invoke('delete-for-all', this.selectedContextMenuItem.id)
          .then((): void => {
            if (this.selectedContextMenuItem) {
              this.messages = this.messages.map((message) => {
                if (message.id === this.selectedContextMenuItem.id) {
                  return {
                    ...message,
                    isRemoving: true,
                  };
                } else {
                  return message;
                }
              });
              setTimeout((): void => {
                this.messages = this.messages.map((message) => {
                  if (message.id === this.selectedContextMenuItem.id) {
                    return {
                      ...message,
                      isRemoving: false,
                    };
                  } else {
                    return message;
                  }
                });
                this.selectedContextMenuItem = null;
              }, 1000);
            }
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

  constructor(
    private _activeModal: NgbActiveModal,
    private lsService: LocalStorageService,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.myUser = this.lsService.getItem('user').userName;
    this.status = this.statuses.find((status) =>
      status.includes(this.ticket.status.toLowerCase())
    );

    this.startSignalRConnection();
  }

  public scrollToBottom(): void {
    const chatBlockElement = this.chatBlock.nativeElement;
    chatBlockElement.scrollTop = Math.max(
      chatBlockElement.scrollHeight,
      chatBlockElement.offsetHeight,
      chatBlockElement.clientHeight
    );
  }

  public onClose(): void {
    this.isOpen = false;
    setTimeout((x) => {
      this._activeModal.close();
      this.closeWindowEmitter.emit();
    }, 500);
  }

  private startSignalRConnection(): void {
    this.user = this.lsService.getItem('user');
    const accessToken = this.lsService.getString('accessToken');

    const headers: MessageHeaders = {
      //"Content-Type" : "application/json",
      Connection: 'Upgrade',
      Upgrade: 'websocket',
      'Sec-WebSocket-Version': '13',
      'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
      'User-Agent': navigator.userAgent,
    };

    const httpConnectionOptions: signalR.IHttpConnectionOptions = {
      headers: headers,
      withCredentials: false,
      accessTokenFactory: () => accessToken,
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${environment.server}/hub/ticket?ticketName=${this.ticket.name}&userName=${this.user.userName}`,
        httpConnectionOptions
      )
      .build();

    this.hubConnection.start()
      .then((): void => {
        this.getAllMessages().subscribe((res: any): void => {
          this.totalMessagesCount = res.total;
          const messagesCopy = [...res.messages];
          this.messages = messagesCopy.reverse();
          this.messages = this.convertMessagesTimezone(this.messages)
          this.generateMapDates();
          this.isLoading = false;
          setTimeout((): void => {
            this.scrollToBottom();
          });
        });
      })
      .catch(err => null);

    this.subscribeMessages();

    this.subscribeStatuses();

    this.subscribeRemoveMessages();

    this.subscribeUpdate();
  }

  private convertMessagesTimezone(messages: any[]): any[] {
    return messages.map((message)=>{
      return {
        ...message,
        createdDate: this.convertUTCtoLocal(message.createdDate),
      }
    })
  }

  private convertUTCtoLocal(utcDateTimeString: string): string {
    return this.dateTimeService.convertToLocaleDateTime(utcDateTimeString)
  }

  public ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  protected onScroll(event): void {
    const startingScrollHeight = event.target.scrollHeight;
      if (event.target.scrollTop === 0) {
        if (!this.loading && this.totalMessagesCount !== this.messages.length) {
          this.pagination = {
            ...this.pagination,
            currentPage: this.pagination.currentPage + 1,
          }
          this.loading = true;
          this.getAllMessages().pipe(take(1)).subscribe((res): void => {
            this.totalMessagesCount = res.total;
            const messagesCopy = [...res.messages];
            this.messages = [
              ...this.convertMessagesTimezone(messagesCopy.reverse()),
              ...this.messages,
            ];
            this.generateMapDates();
            this.loading = false;
            setTimeout((): void => {
              const newScrollHeight = this.chatBlock.nativeElement.scrollHeight;
              this.chatBlock.nativeElement.scrollTo(0, newScrollHeight - startingScrollHeight);
              this.cdr.detectChanges();
            });
          });
        }
      }
  }

  private getAllMessages(): Observable<any> {
    const req = {
      groupId: this.ticket.id,
      userId: this.user.id,
      pageNumber: this.pagination.currentPage,
      pageSize: this.pagination.itemsPerPage,
    }
    return this.store
      .dispatch(new GetFeedbackMessagesAction(req))
      .pipe(
        take(1),
        map((state) => state.FeedbackState.messages),
        switchMap((messagesResponse: any) => {
          return this.store.dispatch(new GetFeedbackMessagesCountAction(this.ticket.id))
            .pipe(take(1),
              map((state) => {
                return {
                  messages: messagesResponse,
                  total: state.FeedbackState.messagesCount
                }
              }))
        })
      );
  }

  private subscribeMessages(): void {
    this.hubConnection.on('receive', (message: any): void => {
      this.messages = [...this.messages, {
        ...message,
        createdDate: this.convertUTCtoLocal(message.created)
      }];
      this.generateMapDates();
      setTimeout((): void => {
        this.scrollToBottom();
        this.isSendingMessage = false;
      });
    });
  }

  private subscribeUpdate(): void {
    this.hubConnection.on('update', (message: any): void => {
      const editableIndex = this.messages.findIndex((x): boolean => x.id === message.id);
      if (editableIndex !== -1) {
        this.messages = [
          ...this.messages.slice(0, editableIndex),
          {
            ...message,
            createdDate: this.convertUTCtoLocal(message.created)
          },
          ...this.messages.slice(editableIndex + 1),
        ];
      }
    });
    this.cdr.detectChanges();
  }

  private subscribeStatuses(): void {
    this.hubConnection.on('changeStatus', (status: string): void => {
      this.status = this.statuses.find((statusItem: string) => {
        return statusItem.includes(status.toLowerCase());
      });
    });
  }

  private subscribeRemoveMessages(): void {
    this.hubConnection.on('remove', (id: number): void => {
      this.isRemoving = true;
      setTimeout((x): void => {
        this.messages = this.messages.filter((message): boolean => message.id !== id);
        this.generateMapDates();
        this.isRemoving = false;
      }, 1000);
    });
  }

  private generateMapDates(): void {
    this.messageDates = this.messages.map((message) =>
      message.createdDate
        ? message.createdDate.split('T')[0]
        : message.created.split('T')[0]
    );
    this.messageDates = this.messageDates.filter(
      (value: string, index: number): boolean => this.messageDates.indexOf(value) === index
    );
  }

  protected filterMessagesByDate(date: string): any[] {
    return this.messages.filter((message) =>
      message.createdDate
        ? message.createdDate?.includes(date)
        : message.created?.includes(date)
    );
  }

  protected sendMessage(search: string): void {
    if (search) {
      this.isSendingMessage = true;
      const chatMessage: MessageRequestInterface = {
        message: search,
        ticketName: this.ticket.name,
        ticketId: this.ticket.id,
      };

      this.hubConnection
        ?.invoke(
          'send',
          chatMessage.message,
          chatMessage.ticketName,
          chatMessage.ticketId
        )
        .then((res) => {
          this.isSendingMessage = false;
          this.inputComponent.clearMessageString();

          setTimeout((): void => {
            this.inputComponent.focusInput();
          });
        })
        .catch((err) => null);
    }
  }

  protected editMessage(search: any): void {
    this.isSendingMessage = true;
    this.hubConnection
      .invoke('update', search.id, search.message)
      .then((res) => {
        this.inputComponent.hasEdited = true;
        this.editableMessage = null;
        this.isSendingMessage = false;
        this.inputComponent.clearMessageString();

        setTimeout((): void => {
          this.inputComponent.focusInput();
          this.inputComponent.hasEdited = false;
        });
      });
  }

  protected changeStatus(event: any): void {
    const status: any = {
      id: this.ticket.id,
      status: event.value.split('status.')[1],
    };

    this.hubConnection
      ?.invoke('updateStatus', status.id, status.status)
      .then((res): void => {
      })
      .catch((err): null => null);
  }
  protected getTime(date: string): string {
    date = date.split('.')[0];
    let hours: number = new Date(date).getHours();
    let minutes: number = new Date(date).getMinutes();

    let period: string = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // Година 0 в 12-годинному форматі - 12 година

    return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;
  }

  public ngOnDestroy(): void {
    this.hubConnection.stop();
  }
}
