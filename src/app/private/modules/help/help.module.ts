import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpListComponent } from './components/help-list/help-list.component';
import { HelpComponent } from './components/help/help.component';


@NgModule({
  declarations: [
    HelpListComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
