import { CreateAccountModel } from "../../models/account/create-account.model";

export class CreateAccountAction{

  static readonly type = "[Account state] get accounts";

  constructor(public payload : CreateAccountModel) {
  }
}
