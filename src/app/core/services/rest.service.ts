import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take, pipe, catchError, EMPTY, throwError, mergeMap, of, finalize } from 'rxjs';
import { Rest } from '../models';
import { Store } from '@ngxs/store';
import { AddLoading, LoaderAdd, LoaderRemove, RemoveLoading } from '../states';
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

  public request(method: string, url: string, description: string, request?: any) : Observable<any>{
     const req = new HttpRequest(method, `${this.serverUrl}${url}`, request);
     return this._store.dispatch(new LoaderAdd(description)).pipe(take(1),switchMap(() => {
        return this.http[method](`${this.serverUrl}${url}`, request).pipe(take(1), mergeMap((response) => {
          this._store.dispatch(new LoaderRemove(description)).pipe(take(1));

          return of(response);
        }), catchError((error) => {
          console.error(error);
          this._messageService.add({severity: "error", summary: 'Api Error', detail: error.statusText})
          return throwError(() => error);
        }), finalize(() => this._store.dispatch(new LoaderRemove(description))))
     }));
   }
  // public request(method: string, url: string, description: string, request?: any) : Observable<any>{
  //   const req = new HttpRequest(method, `${this.serverUrl}${url}`, request);
  //   return this._store.dispatch(new LoaderAdd(description)).pipe(take(1),switchMap(() => {
  //    console.log('loader add')
  //      return this.http[method](`${this.serverUrl}${url}`, request).pipe(take(1), mergeMap((response) => {
  //        console.log('success')
  //        this._store.dispatch(new LoaderRemove(description)).pipe(take(1));
  //        return of(response);
  //      }), catchError((error) => {
  //        console.error('error',error);
  //        this._messageService.add({severity: "error", summary: 'Api Error', detail: error.statusText})
  //        return EMPTY
  //      }), finalize(() => this._store.dispatch(new LoaderRemove(description))))
  //   }, catchError((err)=>{
  //    console.log('error', err)
  //    return throwError(()=>err)
  //  })));
  // }
}
