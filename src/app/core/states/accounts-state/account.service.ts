import { GetAllAccountsModel } from './../../models/account/getaccounts.model';
import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { RequestDataModel } from '../../models/request.interface';
import { Observable } from 'rxjs';
import { CreateAccountModel } from '../../models/account/create-account.model';
import { CreateUserResponseModel } from '../../models/account/create-account-response.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _restService : RestService) { }

  public createAccount(model: CreateAccountModel, description: string) : Observable<CreateUserResponseModel> {
    return this._restService.request('POST', 'admin/users/create', description, model);
  }

  public getAllAccounts(request : RequestDataModel, description : string) : Observable<GetAllAccountsModel[]>{
    return this._restService.request("GET", `admin/users?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`, description);
  }

  public deleteAccount(id : number, description : string) : void {
    console.log(id);
    console.log(    this._restService.request("DELETE", `admin/users/${id}`, description));
    this._restService.request("DELETE", `admin/users/${id}`, description);
  }

}
