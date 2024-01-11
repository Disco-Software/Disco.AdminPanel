import { EmailSendingRequestModel } from "../../models/email/email-sending-request.model";

export class SendingEmailAction {
  public static type = '[Sending email action] sending email action'

  constructor(public payload: EmailSendingRequestModel) {}
}
