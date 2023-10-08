import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    var token = this.localStorageService.getString('accessToken');

    if (token) {
      return true;
    }
    else {
      this.router.navigateByUrl('/public');
      return false;
    }

    return false;
  }

}
