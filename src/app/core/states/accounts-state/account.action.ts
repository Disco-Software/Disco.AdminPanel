import { ChangeEmailRequestDto } from "../../models/account/change-email-request.model";
import { ChangePasswordRequestModel } from "../../models/account/change-password-request.mdoel";
import { ChangeRoleRequestModel } from "../../models/account/change-role-request.model";
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
  static readonly type = '[Account state] get accounts count';

  constructor() {}
}

export class SearchAccountsAction{
  static readonly type : string = '[Account state] search account';

  constructor(public payload: string) {

  }
}
export class EditAccountEmailAction{
  static readonly type : string = '[Account state] edit account email';

  constructor(public payload: ChangeEmailRequestDto) {

  }
}
export class EditAccountPasswordAction{
  static readonly type : string = '[Account state] edit account password';

  constructor(public payload: ChangePasswordRequestModel) {

  }
}

export class EditAccountPhotoAction {
  static readonly type: string = '[Account state] edit account photo';

  constructor(public image: any, public id: number) {
  }
}

export class GetSelectedEmailsAction {
    public static type : string = '[Get selected emails] get selected emails'

    constructor(public search : string) {}
}

export class EditAccountRoleAction {
  public static readonly type = "[Change role state] edit role state";

  constructor(public payload : ChangeRoleRequestModel) {}
}
