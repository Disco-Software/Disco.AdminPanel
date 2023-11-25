import {Component, Input, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  AccountModalComponent,
  DeleteModalComponent,
  PushNotificationsModalComponent,
  SendEmailModalComponent
} from "../../../../organisms";


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
    const ref =  this._modalService.open(SendEmailModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.email = this.email
  }

  onSendNotifications() {
    const ref =  this._modalService.open(PushNotificationsModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.email = this.email
  }

  public onDelete() : void {
    const ref =  this._modalService.open(DeleteModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
    ref.componentInstance.id = this.id;
  }

  public onUserInfoClick() : void{
    const ref = this._modalService.open(AccountModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });

    ref.componentInstance.id = this.id;
  }

}
