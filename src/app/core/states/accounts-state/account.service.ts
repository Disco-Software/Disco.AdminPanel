import {AccountModel} from '../../models/account/getaccounts.model';
import {Injectable} from '@angular/core';
import {RestService} from '@core/services';
import {RequestDataModel} from '../../models/request.interface';
import {Observable} from 'rxjs';
import {CreateAccountInterface} from "@core";
import {CreateUserResponseModel} from "../../models/account/create-account-response.model";
import {Account} from '../../models/account/account.model';
import {ChangeEmailRequestDto} from '../../models/account/change-email-request.model';
import {ChangePasswordRequestModel} from '../../models/account/change-password-request.mdoel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _restService : RestService) { }

  public getAllAccounts(request : RequestDataModel, description : string) : Observable<AccountModel[]>{
    return this._restService.request("GET", `admin/account?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`, description);
  }

  public searchAccountsEmails(request : string, description : string) : Observable<AccountModel[]>{
    return this._restService.request("GET", `admin/account?email=*${request}*&pageNumber=1&pageSize=10`, description);
  }

  public createAccount(request: CreateAccountInterface, description: string): Observable<CreateUserResponseModel> {
    return this._restService.request("POST", `admin/account/create`, description, request);
  }

  public deleteAccount(id : number, description : string) : Observable<void> {
    return this._restService.request("DELETE", `admin/account/${id}`, description);
  }

  public getAccountsCount(description : string) : Observable<number>{
    return this._restService.request('GET', 'admin/account/count', description);
  }
  public searchAccounts(search: string, description : string) : Observable<AccountModel[]> {
    return this._restService.request("GET",  `admin/account/search?search=${search}`, description);
  }

  public getAccount(id: number, description : string) : Observable<{account: Account}> {
     return this._restService.request("GET", `admin/account/${id}`, description);
  }

  public changeEmail(request: ChangeEmailRequestDto, description : string) : Observable<{account: Account}>{
    return this._restService.request("PUT", "admin/account/change/email", description, request);
  }

  public changePhoto({image, id}: any, description: string): Observable<{ account: Account }> {
    let fd = new FormData();
    fd.append('photo', image);
    fd.append('userId', id);
    return this._restService.request("PUT", "admin/account/change/photo", description, fd);
  }

  public changePassword(request: ChangePasswordRequestModel, description: string) : Observable<{account : Account}> {
    return this._restService.request("PUT", "admin/account/password/change/password", description, request);
  }
}
