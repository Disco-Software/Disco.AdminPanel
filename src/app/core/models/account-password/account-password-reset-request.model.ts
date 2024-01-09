export interface AccountPasswordResetPasswordRequestModel {
  email : string;
  password : string;
  confirmPassword : string;
  isValidPasswordRecoveryCode : boolean;
}
