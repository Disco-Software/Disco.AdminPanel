import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, of, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountService } from "../services/account.service";
import { Store } from "@ngxs/store";
import { RefreshToken, UsersService } from "../states/users-state";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor(private accountService: AccountService, private _store: Store, private _lsService: LocalStorageService, private _userService: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('accessToken');

    if (token !== null) {
      req = this.addToken(req, token);
    }

    // return next.handle(req)
    // return next.handle(req).pipe( catchError(err => { 
    //   if(err.status === 401) {
    //     this.handleUnauthorizedErrorResponse(req, next)
    //   }
    //   console.log(err); 
    //   return EMPTY 
    // }))

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.handleUnauthorizedErrorResponse(req, next);
      }
      return EMPTY
    }));
  }

  private handleUnauthorizedErrorResponse(request: HttpRequest<any>, next: HttpHandler) {
    this._userService.refreshToken({
      accessToken: localStorage.getItem('accessToken') ?? '',
      refreshToken: localStorage.getItem('refreshToken') ?? '',
    }, 'refresh').pipe(switchMap((accessData: any) => {
      this._lsService.setItem('user', accessData.user);
      this._lsService.setString('accessToken', accessData.accessToken);
      this._lsService.setString('refreshToken', accessData.refreshToken);
      return next.handle(this.addToken(request, this.accessToken))
    }))
    // if (true) {
    //   // this.isRefreshing = true;
    //   this.refreshTokenSubject.next(null);

    //   this.accountService.refreshToken({
    //     accessToken: localStorage.getItem('accessToken') ?? '',
    //     refreshToken: localStorage.getItem('refreshToken') ?? '',
    //   }).subscribe(data => {
    //     console.log(data)
    //     this.accessToken = data.accessToken ?? '';
    //     this.refreshToken = data.refreshToken ?? ''
    //   });

    // if (this.refreshToken)
    //   return this.accountService.refreshToken({ accessToken: this.accessToken ?? '', refreshToken: this.refreshToken ?? '' }).pipe(
    //     switchMap((token: any) => {
    //       this.isRefreshing = false;

    //       this.refreshTokenSubject.next(token.accessToken);

    //       return next.handle(this.addToken(request, token.accessToken));
    //     }),
    //     catchError((err) => {
    //       this.isRefreshing = false;

    //       return throwError(() => err);
    //     })
    //   );
    // }

    // return this.refreshTokenSubject.pipe(
    //   filter(token => token !== null),
    //   take(1),
    //   switchMap((token) => next.handle(this.addToken(request, token))));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }
}
