import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import { MessageService } from "primeng/api";
import { ErrorsCollection } from "../../models/error.model";
import { EMPTY, catchError, tap, Observable } from 'rxjs';
import { AccountPassowrdStateInterface } from "../../models/account-password/account-password-state.interface";
import { AccountPasswordService } from "./account-password.service";
import { ForgotPasswordAction, RecoveryPasswordAction, RecoveryPasswordCodeAction } from './account-password.action';


@State<AccountPassowrdStateInterface>({
  name: "AccountPasswordState",
  defaults: null,
})

@Injectable()
export class AccountPassowrdState {
  constructor(
    private _accountPasswordService : AccountPasswordService,
    private _errorService : MessageService,) {}

    @Action(ForgotPasswordAction)
    public ForgotPassword(
      { patchState }: StateContext<{ }>,
      { payload, language }: ForgotPasswordAction) : Observable<void>{
      return this._accountPasswordService.forgotPassword(payload, ForgotPasswordAction.type, language)
        .pipe(catchError(() => {
          return EMPTY;
        }),
          tap(() => {
            patchState({});
          }));
    }


    @Action(RecoveryPasswordCodeAction)
    public confirmCode(
      { patchState }: StateContext<{ codeConfirmation : boolean }>,
      { payload }: RecoveryPasswordCodeAction) : Observable<boolean>{
      return this._accountPasswordService.confirmCode(payload, RecoveryPasswordCodeAction.type)
        .pipe(catchError(() => {
          return EMPTY;
        }),
          tap((response : boolean) => {
            patchState({codeConfirmation: response});
          }));
    }

    @Action(RecoveryPasswordAction)
    public RecoveryPassword(
      { patchState }: StateContext<{ isReseted : boolean }>,
      { payload }: RecoveryPasswordAction) : Observable<boolean>{
    return this._accountPasswordService.recoveryPassword(payload, RecoveryPasswordAction.type)
        .pipe(catchError(() => {
          return EMPTY;
        }),
          tap((isPasswordReseted : boolean) => {
            patchState({isReseted : isPasswordReseted});
          }));
    }
}
