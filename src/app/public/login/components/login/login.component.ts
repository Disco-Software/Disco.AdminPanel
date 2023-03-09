import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { LogInRequestModel } from '../../../../core/models/account/login.request.model';
import { UserResponseModel } from '../../../../core/models/account/user.response.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("", [
      Validators.minLength(6),
      Validators.required
    ]),
  });

  constructor(
    private _accountService: AccountService,
    private _modalService: NgbModal){}

  public onSubmit() {
    console.log(this.loginForm);

    console.log(typeof this.loginForm.value.email)
    console.log(typeof this.loginForm.value.password)

    this._accountService.loginAsync({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => console.log(res));
  }

  public forgotPasswordOpen(){
    this._modalService.open(ForgotPasswordComponent);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
