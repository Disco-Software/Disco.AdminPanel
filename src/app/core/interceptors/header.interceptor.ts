import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {throwError} from "rxjs";
import {Observable} from "rxjs/internal/Observable";
import {catchError, switchMap} from 'rxjs/operators';
import {RefreshTokenAction} from "@core/states";
import {LocalStorageService} from "@core/services";
import {Store} from "@ngxs/store";
import {RefreshTokenModel} from "@core/models";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _lsService: LocalStorageService, private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._lsService.getString('accessToken');

    if (token !== null) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handleUnauthorizedErrorResponse(req, next);
      } else {
        return throwError(error)
      }
    }));
  }

  private handleUnauthorizedErrorResponse(request: HttpRequest<any>, next: HttpHandler) {
    const req: RefreshTokenModel = {
      accessToken: this._lsService.getString('accessToken'),
      refreshToken: this._lsService.getString('refreshToken'),
    }

    return this.store.dispatch(new RefreshTokenAction(req)).pipe(switchMap((res => {
          const newAccessToken: string = this._lsService.getString('accessToken')
          return next.handle(this.addToken(request, newAccessToken))
        })
      )
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
  }
}
