import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeedbackRoutingModule} from './feedback-routing.module';
import * as _components from './components';
import {CoreModule} from "@core";
import {SharedModule} from "@shared";

const COMPONENTS = [
  _components.FeedbackListComponent
];

const MODULES = [
  CommonModule,
  FeedbackRoutingModule,
  CoreModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class FeedbackModule {
}
