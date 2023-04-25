import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInRequestModel } from '../../models/account/login.request.model';
import { RefreshTokenModel } from '../../models/account/refresh-token.model';
import { UserResponseModel } from '../../models/account/user.response.model';
import { RestService } from '../../services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService {

  public loginAsync(loginRequestModel: LogInRequestModel): Observable<UserResponseModel> {
    return this.request("POST", 'admin/account/log-in', loginRequestModel);
  }

  public refreshToken(model: RefreshTokenModel): Observable<UserResponseModel> {
    return this.request('PUT', 'admin/account/refresh', model);
  }
}
