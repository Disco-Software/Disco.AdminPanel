import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './public/login/components/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from './core/services/account.service';
import { BackendService } from './core/services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { DashbordModule } from './private/dashbord/dashbord.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { LoadingState } from './core/states/loading-state/loading.state';
import { UsersState } from './core/states/users-state/users.state';
import { UsersService } from './core/states/users-state/users.service';
import { PageService } from './core/services/page.service';
import { RestService } from './core/services/rest.service';

const LOGGERS = [
  NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
];

const SERVICES = [
  RestService,
  UsersService
]

const MODULES = [
  BrowserModule,
  CoreModule,
  ReactiveFormsModule,
  AppRoutingModule,
  NgbModule,
  HttpClientModule,
  DashbordModule,
];

const NGXS_MODULES = [
  NgxsModule.forRoot([
    LoadingState,
    UsersState,
  ], { developmentMode: !environment.production }),
  NgxsRouterPluginModule.forRoot(),
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...NGXS_MODULES,
    ...MODULES,
    ...(!environment.production ? LOGGERS : []),
  ],
  providers: [
    ...SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
