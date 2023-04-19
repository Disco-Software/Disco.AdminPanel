import { LogInRequestModel } from '../../models/account/login.request.model';

export class Loading {
  static readonly type = "[Loading] Loading...";
  static readonly description = "loading...";

  constructor(public isLoading: boolean){

  }
}

export class UserLogin{
  static readonly type = "[User Login] User Login";
  static readonly description = "user login";

  constructor(public payload: LogInRequestModel) {

  }
}
