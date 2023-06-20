import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription, Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { EventBusService, LocalStorageService } from '@core/services';
import { LoadingState, UsersState, UserLogin } from '@core/states';
import { LanguageModel, User, UserResponseModel } from '@core/models';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
    private _storageService: LocalStorageService,
    private _modalService: NgbModal,
    private _eventBusService: EventBusService,
    private _store: Store,
    private _router: Router
  ) {
    const language : LanguageModel = this._storageService.getItem('language');

    translate.use(language.shortCode);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this._storageService.getString('accessToken');

    if (this.isLoggedIn) {
      const user = this._storageService.getItem<User>('user');
      this.role = user.roleName ?? '';

      if (this.role !== 'Admin') {
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

  public onSubmit() {
    this._store
      .dispatch(
        new UserLogin({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
      )
      .pipe(
        map((state) => state.UsersState.userInfo),
        takeUntil(this.destroy$)
      )
      .subscribe((response: UserResponseModel) => {
        if (response.user) {
          this._storageService.setItem('user', response.user);
          this._storageService.setString('accessToken', response.accessToken);
          this._storageService.setString('refreshToken', response.refreshToken);

          this._router.navigateByUrl('private/overview');
        }
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
