import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  protected serverUrl: string = '';

  constructor(
    private httpClient: HttpClient,) {
    this.serverUrl = environment.api;
    console.log(this.serverUrl);
  }

  public get(url: string, args?: any): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/${url}`, args);
  }

  public postAsync(url: string, args: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/${url}`, args);
  }

  public putAsync(url: string, args?: any): Observable<any> {
    return this.httpClient.put(`${this.serverUrl}/${url}`, args)
  }

  public delete(url: string, args: any): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/${url}`, args);
  }
}
