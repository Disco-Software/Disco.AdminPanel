import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import * as _components from './components';
import {CoreModule} from "@core";

const COMPONENTS = [_components.HelpListComponent, _components.HelpComponent];

const MODULES = [CommonModule, HelpRoutingModule, CoreModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class HelpModule {}
