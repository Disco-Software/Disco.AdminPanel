import { ForgotPasswordRequestModel } from '../../models'
import { AccountPasswordResetPasswordRequestModel } from '../../models/account-password/account-password-reset-request.model';
import { RecoveryPasswordCodeRequestModel } from '../../models/account-password/password-code-request..model';
import { RecoveryPasswordRequestModel } from '../../models/account-password/recovery-password-request.model';

export class ForgotPasswordAction {
   static readonly type = "[Account password state] account password state";

   constructor(public payload: ForgotPasswordRequestModel, public language: string) {}
}

export class RecoveryPasswordCodeAction {
  static readonly type = "[Account password code reciveing] account password code reciveing";

  constructor(public payload: RecoveryPasswordCodeRequestModel) {}
}

export class RecoveryPasswordAction {
  static readonly type = "[Account password recovery] account password recovery";

  constructor(public payload: RecoveryPasswordRequestModel) {}
}
