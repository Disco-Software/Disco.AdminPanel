import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { UserResponseModel } from '../../models/account/user.response.model';
import { UserLogin, Loading } from './users.actions';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
@State<UserResponseModel>({
  name: "UsersState",
  defaults: null,
})
@Injectable()
export class UsersState {
  constructor(private _userService: UsersService) {}

  @Selector()
  static getUserInfo(result: {
     userInfo : UserResponseModel;
  }): UserResponseModel {
    return result.userInfo;
  }

  @Action(Loading)
  loading(
    { patchState }: StateContext<{ isLoading: boolean}>,
    {isLoading}: Loading
  ) {
    patchState({isLoading: true})
    setTimeout(() => {
      patchState({isLoading: false});
    },3000);
  }


  @Action(UserLogin)
  getUserInfo(
    { patchState }: StateContext<{ userInfo: UserResponseModel }>,
    { payload }: UserLogin
  ) {
    return this._userService.loginAsync(payload)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(`${err}`);
          return EMPTY;
        }),
        tap((response: UserResponseModel) => {
          console.log(response);
          patchState({ userInfo: response});
        })
      );
  }
}
