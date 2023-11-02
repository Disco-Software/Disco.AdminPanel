import { RequestDataModel } from "../../models/request.interface";
import {CreateAccountInterface} from "@core";

export class GetAllAccountsAction{

  static readonly type = "[Account state] get accounts";

  constructor(public payload : RequestDataModel) {
  }
}

export class CreateAccountAction{

  static readonly type = "[Account state] create account";

  constructor(public payload : CreateAccountInterface) {
  }
}

export class AccountAction {
  static readonly type = "[Account state] get account";

  constructor(public payload : number) {
  }
}
