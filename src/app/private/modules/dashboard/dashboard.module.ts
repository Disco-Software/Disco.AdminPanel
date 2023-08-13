import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';
import * as _components from './components';
import { CoreModule } from '@core';
import { GraphComponent } from './components/organisms/graph/graph.component';
import { SharedModule } from '@shared';

const COMPONENTS = [
  _components.DashboardComponent,
  _components.CalendarComponent,
  _components.StatisticCardComponent,
  _components.StatisticSmallCardComponent,
];

const MODULES = [
  CommonModule,
   MatIconModule,
   DashboardRoutingModule,
   CoreModule,
   SharedModule,
  ];

@NgModule({
  declarations: [...COMPONENTS, GraphComponent],
  imports: [...MODULES],
})
export class DashboardModule {}

