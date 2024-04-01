import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import {DashboardRoutingModule} from './dashboard-routing.module';
import * as _components from './components';
import {SharedModule} from '@shared';
import {CoreModule} from "../../../core";

const COMPONENTS = [
  _components.DashboardComponent,
  _components.CalendarComponent,
  _components.StatisticCardComponent,
  _components.GraphComponent,
];

const MODULES = [
  CommonModule,
   MatIconModule,
   DashboardRoutingModule,
   CoreModule,
   SharedModule,
  ];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class DashboardModule {}

