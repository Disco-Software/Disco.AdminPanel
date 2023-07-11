import { RefreshTokenModel } from '@core/models';
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

export class RefreshToken {
  static readonly type = "[Token] Refresh token";
  static readonly description = "refresh token";

  constructor(public payload: RefreshTokenModel) {

  }
}