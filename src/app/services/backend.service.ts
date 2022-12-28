import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private httpClient : HttpClient,
    protected baseAddress : String) {
    baseAddress = environment.baseAddress;
  }

  public async getAsync(url : string, args? : any) {
    let json : string = "";

    let response = await this.httpClient.get(`${this.baseAddress}/${url}`, args)
        .subscribe((response : any) => json = response);

    return json;
  }

  public async postAsync(url : string, args: any){
    var json : string = "";

    var response = await this.httpClient.post(`${this.baseAddress}/${url}`, args)
        .subscribe((response : any) => json = response);

    return json;
  }

  public async putAsync(url : string, args? : any){
    var json : string = "";

    var response = await this.httpClient.put(`${this.baseAddress}/${url}`, args)
        .subscribe((response : any) => json = response);

    return json;
  }

  public async delete(url: string, args: any) {
    var json : string = "";
    var response = await this.httpClient.delete(`${this.baseAddress}/${url}`, args)
      .subscribe((response : any) => json = response);
    return json;
  }
}
