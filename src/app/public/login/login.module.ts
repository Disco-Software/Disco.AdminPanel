import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { CoreModule } from '@core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import * as _components from './components';


export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class LoginModule {}
