import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rest } from '../models';
import { Store } from '@ngxs/store';
import { AddLoading } from '../states';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public http : HttpClient, public _store: Store) { }

  request<T, R>(url : HttpRequest<T> | Rest.IRequest<T>, config: Rest.Config) : Observable<R> {
    console.log(url);
    console.log(config);

    return this._store.dispatch(new AddLoading());
  }
}
