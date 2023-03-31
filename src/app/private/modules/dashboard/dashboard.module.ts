import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components';
import { CalendarComponent } from './components/organisms/calendar/calendar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
