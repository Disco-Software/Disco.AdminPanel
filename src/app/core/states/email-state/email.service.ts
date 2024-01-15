import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { EmailSendingRequestModel } from '../../models/email/email-sending-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _restService : RestService) { }

  public send(payload : EmailSendingRequestModel, description : string) : Observable<void> {
     return this._restService.request('POST', 'admin/emails/admin/send', description, payload);
  }
}
