import { Component, Input, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../../../../organizms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() public name : String;
  @Input() public email : String;
  @Input() public photo : String;

  constructor(private _modalService : NgbModal) { }

  ngOnInit(): void {
  }

  public onDelete() : void {
    this._modalService.open(DeleteModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    });
  }

}
