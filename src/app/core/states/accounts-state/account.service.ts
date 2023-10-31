import {AccountModel} from './../../models/account/getaccounts.model';
import {Injectable} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {RequestDataModel} from '../../models/request.interface';
import {Observable} from 'rxjs';
import {CreateAccountInterface} from "@core";
import {CreateUserResponseModel} from "../../models/account/create-account-response.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _restService : RestService) { }

  public getAllAccounts(request : RequestDataModel, description : string) : Observable<AccountModel[]>{
    return this._restService.request("GET", `admin/users?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`, description);
  }

  public createAccount(request: CreateAccountInterface, description: string): Observable<CreateUserResponseModel> {
    return this._restService.request("POST", `admin/users/create`, description, request);
  }

  public deleteAccount(id : number, description : string) : Observable<void> {
    return this._restService.request("DELETE", `admin/users/${id}`, description);
  }

  public searchAccounts(search: string, description : string) : Observable<AccountModel[]> {
    return this._restService.request("GET",  `admin/users/search?search=${search}`, description);
  }

}
