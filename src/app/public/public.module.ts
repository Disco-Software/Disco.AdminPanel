import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';

const MODULES = [
  CommonModule,
  CoreModule,
  SharedModule,
  PublicRoutingModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ]
})
export class PublicModule { }
