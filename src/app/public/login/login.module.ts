import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared';
import {CodeInputModule} from 'angular-code-input';

import {LoginRoutingModule} from './login-routing.module';
import * as _components from './components';
import {CoreModule} from "../../core";


const COMPONENTS = [
  _components.LoginComponent,
  _components.ForgotPasswordComponent,
  _components.ResetPasswordComponent,
  _components.PasswordCodeModalComponent,
];

const MODULES = [
  CommonModule,
  CoreModule,
  LoginRoutingModule,
  SharedModule,
  CodeInputModule.forRoot({
    codeLength: 7,
    isCharsCode: false,
  }),
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class LoginModule {}
