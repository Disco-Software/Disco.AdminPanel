import { Action, State, StateContext } from "@ngxs/store";
import { EMPTY, catchError, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";
import { SendNotificationAction } from "./notification.action";

@State({
  name: "NotificationState",
  defaults: null,
})
@Injectable()
export class NotificationState {
  constructor(public notificationService : NotificationService) {}

  @Action(SendNotificationAction)
  public sendEmail(
    { patchState } : StateContext<{ }>,
    { payload } : SendNotificationAction) {
      return this.notificationService.sendNotification(payload, SendNotificationAction.type).pipe(
        catchError(() => {
          return EMPTY;
      }), tap(() => {
        patchState({});
      }))
    }
}
