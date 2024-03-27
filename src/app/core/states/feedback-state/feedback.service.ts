import {Injectable} from '@angular/core';
import {RestService} from '@core/services';
import {Observable} from 'rxjs';
import {FeedbackInterface, FeedbackMessagesRequestInterface, RequestDataModel} from "@core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _restService : RestService, private h: HttpClient) { }

  public getAllFeedbacks(payload: RequestDataModel, isArchive: boolean, description : string): Observable<FeedbackInterface[]> {
    //TODO make dynamic
    return this._restService.request('GET', `admin/tickets?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}&statusType=${isArchive ? 'Archived': 'Active'}`, description, payload);
  }

  public getFeedbacksCount(isArchive: boolean, description : string) : Observable<number>{
    return this._restService.request('GET', `admin/tickets/count?isArchived=${isArchive}`, description);
  }

  public getFeedbackMessages(payload: FeedbackMessagesRequestInterface, description: string): Observable<any> {
    return this._restService.requestWithoutLoader('GET', `admin/tickets/messages?groupId=${payload.groupId}&userId=${payload.userId}&pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`);
  }

  public getFeedbackMessagesCount(ticketId: number, description: string): Observable<any> {
    return this._restService.requestWithoutLoader('GET', `admin/tickets/messages/count?ticketId=${ticketId}`);
  }
}
