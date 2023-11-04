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

export class GetAccountsCountAction{
  static readonly type = '[Get accounts count] get accounts count';

  constructor() {}
}

export class SearchAccountsAction{
  static readonly type : string = '[Search account] search account';

  constructor(public payload: string) {

  }
}
