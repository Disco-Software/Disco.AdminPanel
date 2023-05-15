import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

import * as _states from './states';
import * as _services from './services';
import * as _interceptors from './interceptors';


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
  NgxsModule.forFeature([_states.LoadingState, _states.UsersState]),
];

const MODULES = [NgxsModule, HttpClientModule];

@NgModule({
  imports: [CommonModule, ...MODULES, ...NGXS_MODULES],
  exports: [...MODULES],
  providers: [...SERVICES],
})
export class CoreModule {}
