import { Injectable } from '@angular/core';
import { RestService } from '@core/services';
import { Observable } from 'rxjs';
import {FeedbackInterface, RequestDataModel} from "@core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _restService : RestService, private h: HttpClient) { }

  public getAllFeedbacks(payload: RequestDataModel, isArchive: boolean, description : string): Observable<FeedbackInterface[]> {
    //TODO make dynamic
    return this._restService.request('GET', `admin/tickets?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}&statusType=Active`, description, payload);
  }

  public getFeedbacksCount(description : string) : Observable<number>{
    return this._restService.request('GET', 'admin/tickets/count', description);
  }
}
