import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Selector, Store} from '@ngxs/store';
import {GetAccountsCountAction, GetAllAccountsAction} from 'src/app/core/states/accounts-state/account.action';
import {take, map, Observable, takeUntil, Subject} from 'rxjs';
import { AccountModel } from 'src/app/core/models/account/getaccounts.model';
import {AccountsState} from "../../../../../core/states/accounts-state/account.state";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  @Select(AccountsState.getAllAccountsSelector) accounts$: Observable<AccountModel[]>
  accounts : AccountModel[];
  @Select(AccountsState.getAccountsCountSelector) totalCount$ : Observable<number>;
  totalCount : number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  isSmallPaginator: boolean;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.isSmallPaginator = window.innerWidth <= 450
  }

  constructor(private _store : Store) {}

  ngOnInit(): void {
    this.getScreenSize();
    this.getTotalCount();
    this.totalCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.totalCount = count;
    })

    this.getData(1, 5);
    this.accounts$.pipe(takeUntil(this.destroy$)).subscribe(res=>{
      console.log(res)
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
