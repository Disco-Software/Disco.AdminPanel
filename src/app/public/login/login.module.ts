import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { CoreModule } from '@core';
import { CodeInputModule } from 'angular-code-input';

import { LoginRoutingModule } from './login-routing.module';
import * as _components from './components';
import { PasswordCodeModalComponent } from './components/password-code-modal/password-code-modal.component';


const COMPONENTS = [
  _components.LoginComponent,
  _components.ForgotPasswordComponent,
  _components.ResetPasswordComponent,
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
  declarations: [...COMPONENTS, PasswordCodeModalComponent],
  imports: [...MODULES],
})
export class LoginModule {}
