import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngxs/store";
import {GetFeedbacksCountAction} from "@core";

@Injectable({
  providedIn: 'root'
})
export class SidebarResolver implements Resolve<boolean> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new GetFeedbacksCountAction(false));
  }
}
