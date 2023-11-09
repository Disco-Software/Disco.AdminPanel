import { Component, Injector, Input, OnInit } from '@angular/core';
import { AccountModalComponent, DeleteModalComponent } from '../../../../organizms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SendEmailModalComponent} from "../../../../organizms/send-email-modal/send-email-modal.component";

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
