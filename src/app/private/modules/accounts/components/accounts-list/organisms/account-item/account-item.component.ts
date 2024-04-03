import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {
  DeleteUserModalWindowComponent,
  PushNotificationsModalWindowComponent,
  SendEmailModalWindowComponent,
  UserModalWindowComponent
} from "../modal-windows";
import {take} from "rxjs";


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent {
  @Output() updatedItemData: EventEmitter<any> = new EventEmitter()

  @Input() public id: number;
  @Input() public role: string;
  @Input() public name: string;
  @Input() public email: string;
  @Input() public photo: string;

  items = [
    {
      label: 'account-item.emailNotification',
      command: (): void => {
        this.onSendEmail();
      }
    },
    {
      label: 'account-item.pushNotificationButton',
      command: (): void => {
        this.onSendNotifications();
      }
    },
    {
      label: 'account-item.deleteButton',
      command: (): void => {
        this.onDelete()
      }
    }
  ];

  constructor(
    private _modalService: NgbModal) {
  }

  protected onSendEmail(): void {
    const ref: NgbModalRef = this._modalService.open(SendEmailModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    ref.componentInstance.email = this.email;
  }

  protected onSendNotifications(): void {

    const ref: NgbModalRef = this._modalService.open(PushNotificationsModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    ref.componentInstance.name = this.name;
  }

  protected onDelete(): void {
    const ref: NgbModalRef = this._modalService.open(DeleteUserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    ref.componentInstance.id = this.id;
  }

  protected onUserInfoClick(): void {
    const ref: NgbModalRef = this._modalService.open(UserModalWindowComponent, {
      size: 'lg',
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });

    ref.componentInstance.id = this.id;
    ref.componentInstance.role = this.role;
    ref.componentInstance.updatedItemData.pipe(take(1)).subscribe((): void => {
      this.updatedItemData.emit();
    })
  }

}
