import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components';
import { CalendarComponent } from './components/organisms/calendar/calendar.component';
import { MatIconModule } from '@angular/material/icon';
import { StatisticCardComponent } from './components/organisms/statistic-card/statistic-card.component';
import { StatisticSmallCardComponent } from './components/organisms/statistic-small-card/statistic-small-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    StatisticCardComponent,
    StatisticSmallCardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
