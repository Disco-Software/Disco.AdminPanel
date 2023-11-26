import {Component, Input} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    DeleteUserModalWindowComponent,
    PushNotificationsModalWindowComponent,
    SendEmailModalWindowComponent,
    UserModalWindowComponent
} from "../modal-windows";


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent {

  @Input() public id : number;
  @Input() public name : string;
  @Input() public email : string;
  @Input() public photo : string;

  items = [
    {
      label: 'Send Email',
      command: () => {
        this.onSendEmail();
      }
    },
    {
      label: 'Send Push Notifications',
      command: () => {
        this.onSendNotifications();
      }
    },
    {
      label: 'Delete User',
      command: () => {
        this.onDelete()
      }
    }
  ];

  constructor(private _modalService : NgbModal) { }

  onSendEmail() {
    const ref =  this._modalService.open(SendEmailModalWindowComponent, {
        modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop : 'static',
        keyboard: false,
        centered: true,
    });
    ref.componentInstance.email = this.email
  }

  onSendNotifications() {

    const ref =  this._modalService.open(PushNotificationsModalWindowComponent, {
        modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop : 'static',
        keyboard: false,
        centered: true,
    });
    ref.componentInstance.email = this.email
  }

  public onDelete() : void {
    const ref =  this._modalService.open(DeleteUserModalWindowComponent, {
        modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop : 'static',
        keyboard: false,
        centered: true,
    });
    ref.componentInstance.id = this.id;
  }

  public onUserInfoClick() : void{
    const ref = this._modalService.open(UserModalWindowComponent, {
        size: 'lg',
        modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop : 'static',
      keyboard : false,
        centered: true,
    });

    ref.componentInstance.id = this.id;
  }

}
