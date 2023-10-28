import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import { AccountService } from './account.service';
import {GetAllAccountsAction} from './account.action';
import { GetAllAccountsModel } from '../../models/account/getaccounts.model';
import { RemoveAccountAction } from './remove.action';
import { CreateAccountAction } from './create.action';
import { CreateUserResponseModel } from '../../models/account/create-account-response.model';
import { patch } from '@ngxs/store/operators';

@State<GetAllAccountsModel>({
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

  @Action(RemoveAccountAction)
  public deleteAccount(
    { patchState }: StateContext<{ }>,
    { payload }: RemoveAccountAction
  ) {
    return this._accountService.deleteAccount(payload, RemoveAccountAction.type);
  }

  public createAccount(
    {patchState } : StateContext<{ }>,
    {payload} : CreateAccountAction
  ){
    return this._accountService.createAccount(payload, '[Create account] create account action')
          .pipe(
            catchError((error : HttpErrorResponse) => {
              return EMPTY;
          }),
          tap((response : CreateUserResponseModel) => {
            console.log(response);
            patchState({account: response});
          }))
  }

}
