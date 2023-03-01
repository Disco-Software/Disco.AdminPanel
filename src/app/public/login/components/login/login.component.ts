import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { LogInRequestModel } from '../../../../core/models/account/login.request.model';
import { UserResponseModel } from '../../../../core/models/account/user.response.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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


  public onSubmit() {

  }

}
