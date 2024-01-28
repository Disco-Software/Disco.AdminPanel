import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngxs/store";
import {GetAllFeedbacks} from "@core";

@Injectable({
  providedIn: 'root'
})
export class FeedbackResolver implements Resolve<boolean> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new GetAllFeedbacks({
        pageNumber: 1,
        pageSize: 5,
      },
      false
  ))
  }
}
