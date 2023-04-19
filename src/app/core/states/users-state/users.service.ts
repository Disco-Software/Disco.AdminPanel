import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInRequestModel } from '../../models/account/login.request.model';
import { RefreshTokenModel } from '../../models/account/refresh-token.model';
import { UserResponseModel } from '../../models/account/user.response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService {


  @Request('admin/account/log-in', 'POST')
  public loginAsync(@Body loginRequestModel: LogInRequestModel): Observable<UserResponseModel> {
    return null;
    //return this._backendService.postAsync('admin/account/log-in', loginRequestModel);
  }

  public refreshToken(model: RefreshTokenModel): Observable<UserResponseModel> {
    return this._backendService.putAsync('admin/account/refresh', model);
  }
}
