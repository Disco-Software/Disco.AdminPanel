import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxsModule} from '@ngxs/store';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from '@shared'
import {HeaderInterceptor, LanguageHeaderInterceptor} from "@core/interceptors";

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CoreModule} from "./core";
import {AppConfigState} from "@core/states";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
  BrowserAnimationsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

const NGXS_MODULES = [
  NgxsModule.forRoot([AppConfigState], {
    developmentMode: !environment.production,
  }),
  NgxsRouterPluginModule.forRoot(),
];

const PROVIDERS = [
  TranslateService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LanguageHeaderInterceptor,
    multi : true,
  },
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...NGXS_MODULES,
    ...MODULES,
    ...(!environment.production ? LOGGERS : []),
  ],
  bootstrap: [AppComponent],
  providers: [...PROVIDERS],
})
export class AppModule {}
