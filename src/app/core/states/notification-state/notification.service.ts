import { Injectable } from "@angular/core";
import { RestService } from "../../services/rest.service";
import { NotificationRequestModel } from '../../models/notification/notification-request.model';
import { Observable } from "rxjs";

@Injectable({
  providedIn : "root"
})
export class NotificationService{
  constructor(private _restService : RestService) {}

  public sendNotification(model : NotificationRequestModel, description : string) {
    return this._restService.request("POST", "admin/news/send", description, model);
  }
}
