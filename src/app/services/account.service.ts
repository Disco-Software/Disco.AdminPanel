import { Injectable } from '@angular/core';
import { LogInRequestModel } from '../models/login.request.model';
import { Observable } from 'rxjs';
import { UserResponseModel } from '../models/user.response.model';
import { BackendService } from '../services/backend.service'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private backendService : BackendService) {

  }

  public loginAsync(loginRequestModel: LogInRequestModel): Observable<UserResponseModel> {
    return this.backendService.postAsync('admin/account/log-in', loginRequestModel);
  }
}
