import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { CoreModule } from '@core';

import { LoginRoutingModule } from './login-routing.module';
import * as _components from './components';


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
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class LoginModule {}
