import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY, take, tap, throwError } from 'rxjs';
import { UserResponseModel } from '../../models/account/user.response.model';
import { UserLogin, Loading, RefreshToken } from './users.actions';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { RefreshTokenModel } from '@core/models';
import { LocalStorageService } from '@core/services';

@State<UserResponseModel>({
  name: "UsersState",
  defaults: null,
})
@Injectable()
export class UsersState {
  constructor(private _userService: UsersService, private _lsService: LocalStorageService) {}

  @Selector()
  static getUserInfo(result: {
     userInfo : UserResponseModel;
  }): UserResponseModel {
    return result.userInfo;
  }

  @Action(UserLogin)
  getUserInfo(
    { patchState }: StateContext<{ userInfo: UserResponseModel }>,
    { payload }: UserLogin
  ) {
    return this._userService.loginAsync(payload, UserLogin.description)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }),
        tap((response: UserResponseModel) => {
          patchState({ userInfo: response});
        })
      );
  }

  @Action(RefreshToken)
  refreshToken(
    { patchState }: StateContext<any /*TODO*/>,
     payload : RefreshTokenModel
  ) {
    return this._userService.refreshToken(payload, RefreshToken.description)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }),
        tap((response: UserResponseModel) => {
          this._lsService.setItem('user', response.user);
          this._lsService.setString('accessToken', response.accessToken);
          this._lsService.setString('refreshToken', response.refreshToken);
        })
      );
  }
}
