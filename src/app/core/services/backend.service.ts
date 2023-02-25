import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  protected baseAddress: string = '';

  constructor(
    private httpClient: HttpClient,) {
    this.baseAddress = environment.baseAddress;
  }

  public get(url: string, args?: any): Observable<any> {
    return this.httpClient.get(`${this.baseAddress}/${url}`, args);
  }

  public postAsync(url: string, args: any): Observable<any> {
    return this.httpClient.post(`${this.baseAddress}/${url}`, args);
  }

  public putAsync(url: string, args?: any): Observable<any> {
    return this.httpClient.put(`${this.baseAddress}/${url}`, args)
  }

  public delete(url: string, args: any): Observable<any> {
    return this.httpClient.delete(`${this.baseAddress}/${url}`, args);
  }
}
