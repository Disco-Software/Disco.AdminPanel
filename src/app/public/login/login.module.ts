import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from '../../core/core.module';
import { LoginComponent, ForgotPasswordComponent, ResetPasswordComponent } from './components';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
