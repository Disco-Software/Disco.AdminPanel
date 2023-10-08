import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getString(key: string): string {
    return localStorage.getItem(key);
  }

  public getItem<T>(key: string) {
    let json = localStorage.getItem(key);
    let item : any;

    if(json){
      item = JSON.parse(json) as T
    }

    return item;
  }

  public setString(key: string, value: string): void {
     localStorage.setItem(key, value);
  }

  public setItem(key: string, value: any): void {
    const json = JSON.stringify(value);

    localStorage.setItem(key, json);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
