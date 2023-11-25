import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModalWindowComponent } from '../modal-windows/create-user-modal-window/create-user-modal-window.component';
import { Store } from '@ngxs/store';
import { GetAllAccountsAction, SearchAccountsAction } from '../../../../../../../core/states/accounts-state/account.action';

@Component({
  selector: 'app-accounts-header',
  templateUrl: './accounts-header.component.html',
  styleUrls: ['./accounts-header.component.scss']
})
export class AccountsHeaderComponent implements OnInit {
  public search : string;

  constructor(
    private _store : Store,
    private _modalService : NgbModal) { }

  ngOnInit(): void {
  }

  public createUser() : void {
    this._modalService.open(CreateUserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    });
  }

  public onSearchButtonClick() : void {
    this.getData();
  }

  public onEnterButtonClick(event : KeyboardEvent){
    this.getData();
  }

  private getData() {
    if(!this.search) {
      this._store.dispatch(new GetAllAccountsAction({ pageNumber: 1, pageSize: 5}));
    }
    else {
      this._store.dispatch(new SearchAccountsAction(this.search));
    }
  }
}
