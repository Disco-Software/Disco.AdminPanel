import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, tap, throwError} from 'rxjs';
import {UserResponseModel} from '@core/models';
import {UsersService} from './users.service';
import {Injectable} from '@angular/core';
import {RefreshTokenModel} from '@core/models';
import {LocalStorageService} from '@core/services';
import {RefreshTokenAction, UserLoginAction} from "./users.actions";

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

  @Action(UserLoginAction)
  getUserInfo(
    { patchState }: StateContext<{ userInfo: UserResponseModel }>,
    { payload }: UserLoginAction
  ) {
    return this._userService.loginAsync(payload, UserLoginAction.type)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }),
        tap((response: UserResponseModel) => {
          patchState({ userInfo: response});
        })
      );
  }

  @Action(RefreshTokenAction)
  refreshToken(
    { patchState }: StateContext<any /*TODO*/>,
     payload : RefreshTokenModel
  ) {
    return this._userService.refreshToken(payload, RefreshTokenAction.type)
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
