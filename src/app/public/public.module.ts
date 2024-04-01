import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { PublicRoutingModule } from './public-routing.module';
import {CoreModule} from "../core";

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
