import { Injectable } from '@angular/core';
import { LogInRequestModel } from '../models/account/login.request.model';
import { Observable } from 'rxjs';
import { UserResponseModel } from '../models/account/user.response.model';
import { BackendService } from './backend.service'
import { RefreshTokenModel } from '../models/account/refresh-token.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private backendService : BackendService) {

  }

  public loginAsync(loginRequestModel: LogInRequestModel): Observable<UserResponseModel> {
    return this.backendService.postAsync('admin/account/log-in', loginRequestModel);
  }

  public refreshToken(model: RefreshTokenModel): Observable<UserResponseModel> {
    return this.backendService.putAsync('admin/account/refresh', model);
  }
}
