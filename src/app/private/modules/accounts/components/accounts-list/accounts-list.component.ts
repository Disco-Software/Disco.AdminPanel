import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetAccountsCountAction, GetAllAccountsAction} from 'src/app/core/states/accounts-state/account.action';
import {Observable, Subject, take, takeUntil} from 'rxjs';
import {AccountModel} from 'src/app/core/models/account/getaccounts.model';
import {AccountsState} from "@core/states";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  @Select(AccountsState.getAllAccountsSelector) private accounts$: Observable<AccountModel[]>
  protected accounts: AccountModel[];
  @Select(AccountsState.getAccountsCountSelector) private totalCount$: Observable<number>;
  protected totalCount: number;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  protected isSmallPaginator: boolean;

  @HostListener('window:resize', ['$event'])
  private getScreenSize(): void {
    this.isSmallPaginator = window.innerWidth <= 450;
  }

  constructor(private _store : Store) {}

  public ngOnInit(): void {
    this.getScreenSize();
    this.getTotalCount();
    this.totalCount$.pipe(takeUntil(this.destroy$)).subscribe((count: number): void => {
      this.totalCount = count;
    })

    this.getData(1, 5);
    this.accounts$.pipe(takeUntil(this.destroy$)).subscribe((res: AccountModel[]): void => {
      this.accounts = res;
    })
  }

  private getData(pageNumber: number, pageSize: number): void {
    this._store.dispatch(new GetAllAccountsAction({ pageNumber, pageSize})).pipe(take(1));
  }

  protected updatedItemData(): void {
    this.getData(1, 5);
  }

  private getTotalCount(): void{
    this._store.dispatch(new GetAccountsCountAction()).pipe(take(1));
  }

  protected onPageChange($event): void {
    this.getData($event.page + 1, 5);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
