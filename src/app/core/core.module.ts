import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';

import * as _states from './states';
import * as _services from './services';
import * as _resolvers from './resolvers';
import {TranslateModule,} from '@ngx-translate/core';

const RESOLVERS = [
  _resolvers.FeedbackResolver,
  _resolvers.SidebarResolver,
]

const SERVICES = [
  _states.AccountService,
  _services.LocalStorageService,
  _services.RestService,
  _states.StatisticsService,
  _states.UsersService,
  _states.FeedbackService
];

const NGXS_MODULES = [
  NgxsModule.forFeature([
    _states.NotificationState,
    _states.AppConfigState,
    _states.UsersState,
    _states.LoaderState,
    _states.StatisticsState,
    _states.AccountsState,
    _states.AccountPassowrdState,
    _states.EmailState,
    _states.FeedbackState
  ]),
];

const MODULES = [NgxsModule, HttpClientModule];

@NgModule({
  imports: [CommonModule, ...MODULES, ...NGXS_MODULES],
  exports: [...MODULES, TranslateModule],
  providers: [...SERVICES, ...RESOLVERS],
})
export class CoreModule {
}
