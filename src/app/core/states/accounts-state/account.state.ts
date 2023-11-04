import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {CreateAccountAction, GetAccountsCountAction, GetAllAccountsAction} from './account.action';
import {GetAllAccountsModel} from '../../models/account/getaccounts.model';
import {RemoveAccountAction} from './remove.action';
import {AccountStateInterface} from "@core";

@State<AccountStateInterface>({
  name: "AccountsState",
  defaults: {
    allAccounts: [],
    count: 0
  },
})
@Injectable()
export class AccountsState {
  constructor(private _accountService: AccountService) {}

  @Selector()
  static getAllAccountsSelector(result: {
     allAccounts : GetAllAccountsModel[];
  }): GetAllAccountsModel[] {
    return result.allAccounts;
  }

  @Selector()
  static getAccountsCountSelector(state: AccountStateInterface): number {
    return state.count
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

}
