import { ChangeEmailRequestDto } from "../../models/account/change-email-request.model";
import { RequestDataModel } from "../../models/request.interface";
import {CreateAccountInterface} from "@core";

export class GetAllAccountsAction{

  static readonly type = "[Account state] get accounts";

  constructor(public payload : RequestDataModel) {
  }
}

export class SearchAccountsByEmailAction{

  static readonly type = "[Account state] get accounts";

  constructor(public payload : string) {
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

export class GetAccountsCountAction{
  static readonly type = '[Get accounts count] get accounts count';

  constructor() {}
}

export class SearchAccountsAction{
  static readonly type : string = '[Search account] search account';

  constructor(public payload: string) {

  }
}
export class EditAccountEmailAction{
  static readonly type : string = '[Edit account email] edit account email';

  constructor(public payload: ChangeEmailRequestDto) {

  }
}
