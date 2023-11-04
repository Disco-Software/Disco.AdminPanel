import { Component, Injector, Input, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../../../../organisms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  public onDelete() : void {
    const ref =  this._modalService.open(DeleteModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    });
    ref.componentInstance.id = this.id;
  }

}
