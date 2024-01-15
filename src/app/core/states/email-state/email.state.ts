import { Action, State, StateContext } from "@ngxs/store";
import { EmailService } from "./email.service";
import { SendingEmailAction } from "./email.action";
import { EMPTY, catchError, tap } from "rxjs";
import { Injectable } from "@angular/core";

@State({
  name: "EmailState",
  defaults: null,
})
@Injectable()
export class EmailState {
  constructor(public _emailService : EmailService) {}

  @Action(SendingEmailAction)
  public sendEmail(
    { patchState } : StateContext<{ }>,
    { payload } : SendingEmailAction) {
      return this._emailService.send(payload, SendingEmailAction.type).pipe(
        catchError(() => {
          return EMPTY;
      }), tap(() => {
        patchState({});
      }))
    }
}
