import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from '@shared'
import { CoreModule } from '@core';
import { HeaderInterceptor } from "@core/interceptors";

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const COMPONENTS = [AppComponent];

const LOGGERS = [
  NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
];

const MODULES = [
  BrowserModule,
  CoreModule,
  SharedModule,
  AppRoutingModule,
  NgbModule,
  BrowserAnimationsModule
];

const NGXS_MODULES = [
  NgxsModule.forRoot([], {
    developmentMode: !environment.production,
  }),
  NgxsRouterPluginModule.forRoot(),
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...NGXS_MODULES,
    ...MODULES,
    ...(!environment.production ? LOGGERS : []),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
  },
  ]
})
export class AppModule {}
