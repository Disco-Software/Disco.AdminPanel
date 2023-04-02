import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageModel } from '../models/page/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private title = new BehaviorSubject<PageModel>({
    pageName: '',
    pageIcon: ''
  });
  private title$ = this.title.asObservable();

  constructor() { }

  public setTitle(pageModel: PageModel) {
    this.title.next(pageModel);
  }

  public getTitle(){
    return this.title$;
  }
}
