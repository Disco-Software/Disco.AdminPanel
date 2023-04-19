import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInRequestModel } from '../../models/account/login.request.model';
import { RefreshTokenModel } from '../../models/account/refresh-token.model';
import { UserResponseModel } from '../../models/account/user.response.model';
import { BackendService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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
