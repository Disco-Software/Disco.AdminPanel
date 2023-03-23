import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AccountService } from "../services/account.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token !== null) {
      req = this.addToken(req, token);
    }

    return next.handle(req);
  }

  private handleUnauthorizedErrorResponse(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);


      this.accountService.refreshToken({
        accessToken: localStorage.getItem('accessToken') ?? '',
        refreshToken: localStorage.getItem('refreshToken') ?? '',
      }).subscribe(data => {
        this.accessToken = data.accessToken ?? '';
        this.refreshToken = data.refreshToken ?? ''
      });

      if (this.refreshToken)
        return this.accountService.refreshToken({ accessToken: this.accessToken ?? '', refreshToken: this.refreshToken ?? '' }).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addToken(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addToken(request, token))));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', token) });
  }
}
