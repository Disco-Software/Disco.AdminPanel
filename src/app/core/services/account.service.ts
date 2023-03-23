import { Injectable } from '@angular/core';
import { LogInRequestModel } from '../models/account/login.request.model';
import { Observable } from 'rxjs';
import { UserResponseModel } from '../models/account/user.response.model';
import { BackendService } from './backend.service'
import { RefreshTokenModel } from '../models/account/refresh-token.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _backendService : BackendService) {

  }

  public loginAsync(loginRequestModel: LogInRequestModel): Observable<UserResponseModel> {
    return this._backendService.postAsync('admin/account/log-in', loginRequestModel);
  }

  public refreshToken(model: RefreshTokenModel): Observable<UserResponseModel> {
    return this._backendService.putAsync('admin/account/refresh', model);
  }
}
