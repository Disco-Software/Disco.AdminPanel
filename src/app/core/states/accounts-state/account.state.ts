import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import { AccountService } from './account.service';
import {CreateAccountAction, GetAllAccountsAction, SearchAccountsAction} from './account.action';
import { AccountModel } from '../../models/account/getaccounts.model';
import { RemoveAccountAction } from './remove.action';

@State<any>({
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
}
