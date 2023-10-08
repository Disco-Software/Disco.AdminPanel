import { RefreshTokenModel } from '@core/models';
import { LogInRequestModel } from '@core/models';

export class UserLoginAction {
  static readonly type = "[User Login] User Login";
  constructor(public payload: LogInRequestModel) {

  }
}

export class RefreshTokenAction {
  static readonly type = "[Token] Refresh token";
  constructor(public payload: RefreshTokenModel) {

  }
}
