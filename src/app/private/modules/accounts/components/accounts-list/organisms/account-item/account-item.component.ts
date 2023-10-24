import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { DeleteModalComponent } from '../../../../organizms/delete-modal/delete-modal.component';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  constructor(private _modalService : NgbModal) { }

  ngOnInit(): void {
  }

  public onDelete() : void {
    this._modalService.open(DeleteModalComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    });
  }

}
