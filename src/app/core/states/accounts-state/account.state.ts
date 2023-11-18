import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {AccountAction, CreateAccountAction, GetAllAccountsAction, SearchAccountsByEmailAction} from './account.action';
import {GetAllAccountsModel} from '../../models/account/getaccounts.model';
import {RemoveAccountAction} from './remove.action';
import {Account} from '../../models/account/account.model';

@State<any>({
  name: "AccountsState",
  defaults: null,
})
@Injectable()
export class AccountsState {
  constructor(private _accountService: AccountService) {}

  @Selector()
  static getAllAccountsSelector(result: {
     allAccounts : GetAllAccountsModel;
  }): GetAllAccountsModel {
    return result.allAccounts;
  }

  @Selector()
  static getAccountSelector(result : {
    account: Account
  }) : Account {
    return result.account;
  }

  @Action(GetAllAccountsAction)
  getAllAccounts(
    { patchState }: StateContext<{ allAccounts: GetAllAccountsModel[] }>,
    { payload }: GetAllAccountsAction
  ) {
    return this._accountService.getAllAccounts(payload, GetAllAccountsAction.type)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: GetAllAccountsModel[]) => {
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
