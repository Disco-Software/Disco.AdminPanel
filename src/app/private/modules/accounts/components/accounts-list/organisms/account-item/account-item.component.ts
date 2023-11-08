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
  @Input() public name : String;
  @Input() public email : String;
  @Input() public photo : String;

  constructor(private _modalService : NgbModal) { }

  ngOnInit(): void {
  }

  onSendEmail() {
    const ref =  this._modalService.open(SendEmailModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100',
      backdrop : 'static',
      keyboard : false
    });
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
