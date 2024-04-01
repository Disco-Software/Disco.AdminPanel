import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeedbackRoutingModule} from './feedback-routing.module';
import * as _components from './components';
import {SharedModule} from "@shared";
import {CoreModule} from "../../../core";

const COMPONENTS = [
  _components.FeedbackListComponent,
  _components.FeedbackChatComponent,
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
