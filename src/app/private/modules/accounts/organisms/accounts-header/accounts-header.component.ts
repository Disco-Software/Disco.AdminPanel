import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { Store } from '@ngxs/store';
import { GetAllAccountsAction, SearchAccountsAction } from 'src/app/core/states/accounts-state/account.action';

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
    this._modalService.open(CreateUserModalComponent, {
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
