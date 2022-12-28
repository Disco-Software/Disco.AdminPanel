import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { LogInRequestModel } from '../models/login.request.model';
import { JsonConvert } from 'json2typescript';
import { UserResponseModel } from '../models/user.response.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private backendService : BackendService) {

  }

  public async loginAsync(loginRequestModel : LogInRequestModel) {
    let json = await this.backendService.postAsync('admin/account/log-in', loginRequestModel);

    let jsonConvert : JsonConvert = new JsonConvert();
    let response = jsonConvert.deserializeObject<UserResponseModel>(json);

    return response;
  }


}
