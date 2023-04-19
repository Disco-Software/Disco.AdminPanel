import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { LogInRequestModel } from '../../../../core/models/account/login.request.model';
import {
  UserResponseModel,
  User,
} from '../../../../core/models/account/user.response.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take, takeUntil, tap, switchMap } from 'rxjs/operators';
import { Subject, Subscription, Observable, map, pipe } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { EventBusService } from '../../../../core/services/event-bus.service';
import { Select, Store } from '@ngxs/store';
import { UsersState } from '../../../../core/states/users-state/users.state';
import {
  UserLogin,
  Loading,
} from '../../../../core/states/users-state/users.actions';
import { LoadingState } from '../../../../core/states/loading-state/loading.state';
import {
  AddLoading,
  RemoveLoading,
} from '../../../../core/states/loading-state/loading.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Select(UsersState) userResponseModel$: Observable<UserResponseModel>;
  @Select(LoadingState.isLoading) loadingState$: Observable<any>;

  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isLoading: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  eventBus$: Subscription;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  constructor(
    private _accountService: AccountService,
    private _storageService: LocalStorageService,
    private _modalService: NgbModal,
    private _eventBusService: EventBusService,
    private _store: Store,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this._storageService.getString('accessToken');

    console.log(`isLoading: ${this.isLoading}`);

    if (this.isLoggedIn) {
      const user = this._storageService.getItem<User>('user');
      this.role = user.roleName ?? '';

      if (this.role !== 'Admin') {
        console.log("user can't be hare");
      }

      this.username = user.userName;

      this._router.navigateByUrl('/private');
    }

    this.eventBus$ = this._eventBusService.on('logout', () => {
      this._storageService.removeItem('accessToken');
      this._storageService.removeItem('refreshToken');
      this._storageService.removeItem('user');
    });
  }

  public createRequest() : Observable<any> {
    return this._store.dispatch(new AddLoading()).pipe(
      switchMap(() =>
         this._store
          .dispatch(
            new UserLogin({
              email: this.loginForm.value.email,
              password: this.loginForm.value.password,
            })
          )
          .pipe(map((state) => state.UsersState.userInfo), takeUntil(this.destroy$), finalize(() => this._store.dispatch(new RemoveLoading()).pipe(takeUntil(this.destroy$))))
      ), takeUntil(this.destroy$)
    );
  }

  public onSubmit() {
       this.createRequest()
      .subscribe((res) => {
        if (!res) {
          console.error('Ups, sumsing wrong');
        }

        this._storageService.setItem('user', res.user);
        this._storageService.setString('accessToken', res.accessToken);
        this._storageService.setString('refreshToken', res.refreshToken);

        this._router.navigateByUrl('private/dashboard');
      });
  }

  public forgotPasswordOpen() {
    this._modalService.open(ForgotPasswordComponent, {
      modalDialogClass:
        'd-flex justify-content-center align-items-center h-100',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
