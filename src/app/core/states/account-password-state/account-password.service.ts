import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ForgotPasswordRequestModel } from '../../models/account-password/account-password-request.model';
import { Observable } from 'rxjs';
import { RecoveryPasswordCodeRequestModel } from '../../models/account-password/password-code-request..model';
import { AccountPasswordResetPasswordRequestModel as AccountPasswordResetRequestModel } from '../../models/account-password/account-password-reset-request.model';
import { RecoveryPasswordRequestModel } from '../../models/account-password/recovery-password-request.model';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountPasswordService {

  constructor(private _restService : RestService) { }

  public forgotPassword(forgotPasswordModel : ForgotPasswordRequestModel, description: string, language: string) : Observable<void> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Language: 'uk'
    });
    const requestOptions = {
      headers: httpHeaders,
    };
    return this._restService.request('POST', 'admin/account/password/forgot', description, forgotPasswordModel, requestOptions);
  }

  public confirmCode(codeConfirmationModel : RecoveryPasswordCodeRequestModel, description: string) : Observable<boolean> {
    return this._restService.request("POST", `admin/account/password/confirm/code?email=${codeConfirmationModel.email}&code=${codeConfirmationModel.code}`, description);
  }

  public recoveryPassword(recoveryPasswordRequestModel : RecoveryPasswordRequestModel, description: string) : Observable<boolean>{
    return this._restService.request('PUT', 'admin/account/password/reset', description, recoveryPasswordRequestModel);
  }
 }
