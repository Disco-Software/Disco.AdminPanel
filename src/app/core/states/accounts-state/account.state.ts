import {Account, AccountStateInterface} from "@core/models";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AccountService} from "./account.service";
import {AccountModel} from "../../models/account/getaccounts.model";
import {
  AccountAction,
  CreateAccountAction, DeleteAccountPhotoAction,
  EditAccountEmailAction,
  EditAccountPasswordAction, EditAccountPhotoAction,
  EditAccountRoleAction,
  GetAccountsCountAction,
  GetAccountsSearchResultAction,
  GetAllAccountsAction, GetSearchedNamesAction, GetSelectedEmailsAction, SearchAccountsAction,
  SearchAccountsByEmailAction
} from "./account.action";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {EMPTY, tap} from "rxjs";
import {RemoveAccountAction} from "./remove.action";
import { ChangeEmailResponseModel } from "../../models/account/change-email-response.model";
import { MessageService } from "primeng/api";
import { ErrorsCollection } from "../../models/error.model";


@State<AccountStateInterface>({
  name: "AccountsState",
  defaults: null,
})
@Injectable()
export class AccountsState {
  constructor(
    private _errorService : MessageService,
    private _accountService: AccountService) {}

  @Selector()
  static getAllAccountsSelector(result: {
     allAccounts : {account: AccountModel}[];
  }): AccountModel[] {
    return result.allAccounts.map((acc: {account: AccountModel})=> acc.account);
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

  @Selector()
  public static getSelectedEmailsSelector(result : {
    emails : string[]
  }) : string[] {
    return result.emails;
  }

  @Selector()
  public static getUserNamesSelector(result) {
    return result.names;
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

    @Action(GetAccountsSearchResultAction)
    public getSearchAccountsCount(
      { patchState } : StateContext<{count : number}>,
      { search } : GetAccountsSearchResultAction) {
        return this._accountService.getSearchAccountsResultCount(search, GetAccountsSearchResultAction.type).pipe(
          catchError((err: HttpErrorResponse) => {
            return EMPTY;
          }),
          tap((response: number) => {
            patchState({ count: response});
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
      tap((response : {account: Account}) => {
        patchState({account: response.account});
      }))
  }

  @Action(EditAccountEmailAction)
  public changeAccountEmail(
    { patchState }: StateContext<{ account: Account }>,
    { payload }: EditAccountEmailAction){
    return this._accountService.changeEmail(payload, EditAccountEmailAction.type)
      .pipe(catchError(() => {
        return EMPTY;
      }),
      tap((response : {account: Account}) => {
        patchState({account: response.account});
      }))
  }

  @Action(GetSelectedEmailsAction)
  public getSelectedEmails(
    {patchState}: StateContext<{ emails : string[] }>,
    {search} : GetSelectedEmailsAction) {
      return this._accountService.getSearchedEmails(search, GetSelectedEmailsAction.type)
        .pipe(catchError(() => {
          return EMPTY;
        }),
        tap((emails : string[]) => {
          patchState({emails : emails})
        }));
    }

  @Action(EditAccountPhotoAction)
  public changeAccountPhoto(
    { patchState }: StateContext<{ account: Account }>,
    { image, id }: EditAccountPhotoAction){
    return this._accountService.changePhoto({image, id}, EditAccountEmailAction.type)
      .pipe(catchError(() => {
          return EMPTY;
        }),
        tap((response : {account: Account}) => {
          patchState({account: response.account});
        }))
  }

  @Action(DeleteAccountPhotoAction)
  public deleteAccountPhoto(
    { patchState }: StateContext<{ account: Account }>,
    { id }: DeleteAccountPhotoAction){
    return this._accountService.deletePhoto(id, EditAccountEmailAction.type)
      .pipe(catchError(() => {
          return EMPTY;
        }),
        tap((response : {account: Account}) => {
          patchState({account: response.account});
        }))
  }


  @Action(EditAccountRoleAction)
  public changeAccountRole(
    { patchState }: StateContext<{ account: Account }>,
    { payload }: EditAccountRoleAction){
    return this._accountService.changeRole(payload, EditAccountRoleAction.type)
      .pipe(catchError(() => {
          return EMPTY;
        }),
        tap((response : {account: Account}) => {
          patchState({account: response.account});
        }))
  }


  @Action(EditAccountPasswordAction)
  public changeAccountPassword(
    { patchState }: StateContext<{ account: Account }>,
    { payload }: EditAccountPasswordAction){
    return this._accountService.changePassword(payload, EditAccountPasswordAction.type)
      .pipe(tap((response : {account: Account}) => {
        patchState({account: response.account});
      }))
  }

  @Action(GetSearchedNamesAction)
  public GetSearchedNames(
    { patchState }: StateContext<{ names: string[] }>,
    { search }: GetSearchedNamesAction){
    return this._accountService.searchUserNames(search, GetSearchedNamesAction.type)
      .pipe(
        tap((response : string[]) => {
        patchState({names: response});
      }))
  }

}
