import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    DeleteUserModalWindowComponent,
    PushNotificationsModalWindowComponent,
    SendEmailModalWindowComponent,
    UserModalWindowComponent
} from "../modal-windows";
import { TranslateService } from "@ngx-translate/core";
import {take} from "rxjs";
import {LocalStorageService} from "@core/services";
import {LanguageModel} from "@core/models";


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent {
  @Output() updatedItemData = new EventEmitter()

  @Input() public id : number;
  @Input() public role : string;
  @Input() public name : string;
  @Input() public email : string;
  @Input() public photo : string;

  items = [
    {
      label: 'account-item.emailNotification',
      command: () => {
        this.onSendEmail();
      }
    },
    {
      label: 'account-item.pushNotificationButton',
      command: () => {
        this.onSendNotifications();
      }
    },
    {
      label: 'account-item.deleteButton',
      command: () => {
        this.onDelete()
      }
    }
  ];

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _modalService : NgbModal) {
      const language : LanguageModel = _storageService.getItem('language');

      _translate.use(language.shortCode);
    }

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
    ref.componentInstance.name = this.name
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
    ref.componentInstance.role = this.role;
    ref.componentInstance.updatedItemData.pipe(take(1)).subscribe(res=>{
      this.updatedItemData.emit()
    })
  }

}
