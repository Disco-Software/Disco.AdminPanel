import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getString(key: string) {
    return localStorage.getItem(key);
  }

  getItem<T>(key: string) {
    let json = localStorage.getItem(key);
    let item : any;

    if(json){
      item = JSON.parse(json) as T
    }

    return item;
  }

  public setString(key: string, value: string) {
     localStorage.setItem(key, value);
  }

  public setItem(key: string, value: any) {
    const json = JSON.stringify(value);

    localStorage.setItem(key, json);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

}
