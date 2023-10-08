import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInRequestModel, RefreshTokenModel, UserResponseModel } from '@core/models';
import { RestService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
  constructor(private rest: RestService){}

  public loginAsync(loginRequestModel: LogInRequestModel, description): Observable<UserResponseModel> {
    return this.rest.request("post", 'admin/account/log-in',description, loginRequestModel);
  }

  public refreshToken(model: RefreshTokenModel, description): Observable<UserResponseModel> {
    return this.rest.request('put', 'admin/account/refresh',description,  model);
  }
}
