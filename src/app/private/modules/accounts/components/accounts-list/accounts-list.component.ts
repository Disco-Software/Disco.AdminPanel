import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllAccountsAction } from 'src/app/core/states/accounts-state/account.action';
import { take, map } from 'rxjs';
import { GetAllAccountsModel } from 'src/app/core/models/account/getaccounts.model';
import { AccountItemComponent } from './organisms/account-item/account-item.component';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  accounts : GetAllAccountsModel[];

  constructor(private _store : Store) {

  }

  ngOnInit(): void {
    this.getData(1, 5);
  }

  public getData(pageNumber : number, pageSize : number) {
    this._store.dispatch(new GetAllAccountsAction({ pageNumber, pageSize})).pipe(take(1), map(x => x.AccountsState.allAccounts)).subscribe((x) => {
      this.accounts = x;
      console.log(this.accounts);
    })

  }

  public onPageChange($event) {
    console.log($event);
    this.getData($event.page + 1, 5);
  }
}
