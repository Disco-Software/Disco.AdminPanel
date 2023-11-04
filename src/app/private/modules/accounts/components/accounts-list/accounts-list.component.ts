import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { GetAccountsCountAction, GetAllAccountsAction } from 'src/app/core/states/accounts-state/account.action';
import {take, map, Observable, takeUntil, Subject} from 'rxjs';
import { GetAllAccountsModel } from 'src/app/core/models/account/getaccounts.model';
import {AccountsState} from "../../../../../core/states/accounts-state/account.state";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  @Select(AccountsState.getAllAccountsSelector) accounts$: Observable<GetAllAccountsModel[]>
  @Select(AccountsState.getAccountsCountSelector) totalCount$ : Observable<number>;

  accounts : GetAllAccountsModel[];
  totalCount : number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _store : Store) {

  }

  ngOnInit(): void {
    this.getTotalCount();
    this.totalCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.totalCount = count;
    })

    this.getData(1, 5);
    this.accounts$.pipe(takeUntil(this.destroy$)).subscribe(res=>{
      this.accounts = res
    })
  }

  public getData(pageNumber : number, pageSize : number) {
    this._store.dispatch(new GetAllAccountsAction({ pageNumber, pageSize})).pipe(take(1))
  }

  public getTotalCount(){
    this._store.dispatch(new GetAccountsCountAction()).pipe(take(1));
  }

  public onPageChange($event) {
    this.getData($event.page + 1, 5);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
