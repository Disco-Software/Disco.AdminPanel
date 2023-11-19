import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {AccountAction, CreateAccountAction, GetAllAccountsAction, SearchAccountsByEmailAction} from './account.action';
import {GetAllAccountsModel} from '../../models/account/getaccounts.model';
import {RemoveAccountAction} from './remove.action';
import {Account} from '../../models/account/account.model';
import { AccountService } from './account.service';
import {
  CreateAccountAction,
  GetAccountsCountAction,
  GetAllAccountsAction,
  SearchAccountsAction
} from './account.action';
import { AccountModel } from '../../models/account/getaccounts.model';
import { RemoveAccountAction } from './remove.action';
import {AccountStateInterface} from "@core/models";

@State<AccountStateInterface>({
  name: "AccountsState",
  defaults: null,
})
@Injectable()
export class AccountsState {
  constructor(private _accountService: AccountService) {}

  @Selector()
  static getAllAccountsSelector(result: {
     allAccounts : AccountModel[];
  }): AccountModel[] {
    return result.allAccounts;
  }

  @Selector()
  static getAccountSelector(result : {
    account: Account
  }) : Account {
    return result.account;
  }

  @Selector()
  static getAccountsCountSelector(state: AccountStateInterface): number {
    return state.count
  }

  // @Selector()
  // static searchSelector(result: {
  //   accounts: AccountModel[]
  // }) : AccountModel[] {
  //   return result.accounts;
  // }

  @Action(GetAllAccountsAction)
  getAllAccounts(
    { patchState }: StateContext<{ allAccounts: AccountModel[] }>,
    { payload }: GetAllAccountsAction
  ) {
    return this._accountService.getAllAccounts(payload, GetAllAccountsAction.type)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: AccountModel[]) => {
          patchState({ allAccounts: response});
        })
      );
  }

  @Action(SearchAccountsByEmailAction)
  SearchAccountsByEmailAction(
    {patchState}: StateContext<{ accountsEmails: string[] }>,
    {payload}: SearchAccountsByEmailAction
  ) {
   this._accountService.searchAccountsEmails(payload, SearchAccountsByEmailAction.type)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((accountsEmails: any[]) => {
          console.log(accountsEmails)
          patchState({ accountsEmails});
        })
      )
  }

  @Action(CreateAccountAction)
  public createAccount(
    { patchState }: StateContext<{ }>,
    { payload }: CreateAccountAction
  ) {
    return this._accountService.createAccount(payload, CreateAccountAction.type);
  }

  @Action(RemoveAccountAction)
  public deleteAccount(
    { patchState }: StateContext<{ }>,
    { payload }: RemoveAccountAction
  ) {
    return this._accountService.deleteAccount(payload, RemoveAccountAction.type);
  }

  @Action(GetAccountsCountAction)
  public getAccountsCount(
    { patchState }: StateContext<{ count: number }>,
  ) {
    return this._accountService.getAccountsCount(GetAccountsCountAction.type)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return EMPTY;
      }),
      tap((response : number) => {
        patchState({count : response});
      }))
  }

  @Action(SearchAccountsAction)
  public searchAccounts(
    { patchState } : StateContext<{allAccounts : AccountModel[]}>,
    { payload } : SearchAccountsAction) {
      return this._accountService.searchAccounts(payload, SearchAccountsAction.type).pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: AccountModel[]) => {
          patchState({ allAccounts: response});
        })
      );
    }
  @Action(AccountAction)
  public getAccount(
    { patchState }: StateContext<{ account: Account }>,
    { payload }: AccountAction){
    return this._accountService.getAccount(payload, AccountAction.type)
      .pipe(catchError(() => {
        return EMPTY;
      }),
      tap((response : Account) => {
        patchState({account: response});
      }))
  }

}
