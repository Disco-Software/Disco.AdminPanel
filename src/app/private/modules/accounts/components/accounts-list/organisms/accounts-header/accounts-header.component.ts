import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateUserModalWindowComponent} from '../modal-windows';
import {Store} from '@ngxs/store';
import {GetAllAccountsAction, SearchAccountsAction} from '@core/states';

@Component({
  selector: 'app-accounts-header',
  templateUrl: './accounts-header.component.html',
  styleUrls: ['./accounts-header.component.scss']
})
export class AccountsHeaderComponent {
  constructor(
    private _store : Store,
    private _modalService : NgbModal) {
    }

  public createUser() : void {
    this._modalService.open(CreateUserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      centered: true
    });
  }

  public onEnterButtonClick(searchString: string): void {
    this.getData(searchString);
  }

  private getData(searchString: string): void {
    if (!searchString) {
      this._store.dispatch(new GetAllAccountsAction({ pageNumber: 1, pageSize: 5}));
    }
    else {
      this._store.dispatch(new SearchAccountsAction(searchString));
    }
  }
}
