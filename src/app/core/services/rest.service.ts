import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take, pipe, catchError, EMPTY, throwError } from 'rxjs';
import { Rest } from '../models';
import { Store } from '@ngxs/store';
import { AddLoading, RemoveLoading } from '../states';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  protected serverUrl : string = '';

  constructor(public http : HttpClient, public _store: Store, public _messageService : MessageService) {
     this.serverUrl = environment.api;
   }

  protected request(method: string, url: string, request?: any ) : Observable<any>{
     const req = new HttpRequest(method, `${this.serverUrl}${url}`, request);

     return this._store.dispatch(new AddLoading()).pipe(take(1),switchMap(() => {
        return this.http.request(req).pipe(take(1), switchMap(() => {
          return this._store.dispatch(new RemoveLoading()).pipe(take(1));
        }), catchError((error) => {
          console.error(error);

          this._messageService.add({severity: "error", summary: 'Api Error', detail: error})

          return throwError(() => error);
        }))
     }));
   }
}
