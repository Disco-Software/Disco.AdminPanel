import { GetAllAccountsModel } from './../../models/account/getaccounts.model';
import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { RequestDataModel } from '../../models/request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _restService : RestService) { }

  public getAllAccounts(request : RequestDataModel, description : string) : Observable<GetAllAccountsModel[]>{
    return this._restService.request("GET", `admin/users?pageNumber=${request.pageNumber}&pageSize=${request.pageSize}`, description);
  }

}
