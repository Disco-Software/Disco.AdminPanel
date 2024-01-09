export interface RecoveryPasswordRequestModel {
  email : string;
  password : string;
  confirmPassword : string;
  isValidPasswordRecoveryCode : boolean;
}
