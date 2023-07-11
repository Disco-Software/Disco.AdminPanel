import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import * as _states from './states';
import * as _services from './services';
import * as _interceptors from './interceptors';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const SERVICES = [
  _services.AccountService,
  _services.EventBusService,
  _services.LocalStorageService,
  _services.PageService,
  _services.RestService,
  _states.StatisticsService,
  _states.UsersService,
];

const NGXS_MODULES = [
  NgxsModule.forFeature([_states.LoadingState, _states.UsersState, _states.StatisticsState, _states.LoaderState]),
];

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const MODULES = [NgxsModule, HttpClientModule];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
    ...NGXS_MODULES,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [...MODULES, TranslateModule],
  providers: [...SERVICES],
})
export class CoreModule {}
