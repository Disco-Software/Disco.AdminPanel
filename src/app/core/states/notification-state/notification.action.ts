import { NotificationRequestModel } from "../../models/notification/notification-request.model";

export class SendNotificationAction {
  public static type = "[Send notification action] send notification action";

  constructor(public payload: NotificationRequestModel) {}
}
