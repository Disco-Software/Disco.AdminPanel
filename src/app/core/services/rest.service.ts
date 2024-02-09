import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, finalize, map, mergeMap, Observable, of, switchMap, take, throwError} from 'rxjs';
import {Store} from '@ngxs/store';
import {environment} from '../../../environments/environment';
import {MessageService} from 'primeng/api';
import {LoaderAddAction, LoaderRemoveAction} from "@core/states";

@Injectable({
  providedIn: 'root'
})

export class RestService {

  protected serverUrl : string = '';

  constructor(public http : HttpClient, public _store: Store, public _messageService : MessageService) {
     this.serverUrl = environment.api;
   }

  public request(method: string, url: string, description?: string, requestObject?: any, requestOptions?: any): Observable<any> {
     return this._store.dispatch(new LoaderAddAction(description)).pipe(take(1),switchMap(() => {
       return this.http[(method).toLowerCase()](`${this.serverUrl}/${url}`, requestObject, requestOptions)
         .pipe(
           take(1),
           mergeMap((response) => {
          this._store.dispatch(new LoaderRemoveAction(description)).pipe(take(1));
          return of(response);
        }), catchError((error) => {
          if(error.error) {
            let errors: any = error.error;
            if(typeof errors === 'string') {
              errors = JSON.parse(errors)
            }
            this.showToasterWithErrorMessages(errors.errorMessages)
          } else if(error.errorMessages) {
            this.showToasterWithErrorMessages(error.errorMessages)
          } else {
            this.showToasterWithErrorMessages(error.statusText)
          }
          return throwError(() => error);
        }), finalize(() => this._store.dispatch(new LoaderRemoveAction(description))))
     }));
   }

  public requestWithoutLoader(method: string, url: string, description?: string, requestObject?: any, requestOptions?: any): Observable<any> {
      return this.http[(method).toLowerCase()](`${this.serverUrl}/${url}`, requestObject, requestOptions)
        .pipe(
          take(1),
          mergeMap((response) => {
            return of(response);
          }), catchError((error) => {
            if(error.error) {
              let errors: any = error.error;
              if(typeof errors === 'string') {
                errors = JSON.parse(errors)
              }
              this.showToasterWithErrorMessages(errors.errorMessages)
            } else if(error.errorMessages) {
              this.showToasterWithErrorMessages(error.errorMessages)
            } else {
              this.showToasterWithErrorMessages(error.statusText)
            }
            return throwError(() => error);
          }))
  }

   showToasterWithErrorMessages(errorMessages): void {
    if(!errorMessages) {
      return;
    }
    if(typeof errorMessages === 'string') {
      this._messageService.add({severity: "error", summary: 'Api Error', detail: errorMessages})
    } else {
      errorMessages.forEach(error=>{
        this._messageService.add({severity: "error", summary: 'Api Error', detail: error.message})
      })
    }
   }
}
