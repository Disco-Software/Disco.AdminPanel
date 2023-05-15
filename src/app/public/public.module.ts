import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';

import { PublicRoutingModule } from './public-routing.module';

const MODULES = [
  PublicRoutingModule,
  CommonModule,
  CoreModule,
  SharedModule,
]

@NgModule({
  imports: [
    ...MODULES
  ]
})
export class PublicModule { }
