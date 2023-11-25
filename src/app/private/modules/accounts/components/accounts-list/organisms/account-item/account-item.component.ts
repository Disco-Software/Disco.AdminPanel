import {Component, Input, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  UserModalWindowComponent,
  DeleteUserModalWindowComponent,
  PushNotificationsModalWindowComponent,
  SendEmailModalWindowComponent
} from "../modal-windows";


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

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

  ngOnInit(): void {
  }

  onSendEmail() {
    const ref =  this._modalService.open(SendEmailModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.email = this.email
  }

  onSendNotifications() {
    console.log('not')
    const ref =  this._modalService.open(PushNotificationsModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.email = this.email
  }

  public onDelete() : void {
    const ref =  this._modalService.open(DeleteUserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.id = this.id;
  }

  public onUserInfoClick() : void{
    const ref = this._modalService.open(UserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });

    ref.componentInstance.id = this.id;
  }

}
