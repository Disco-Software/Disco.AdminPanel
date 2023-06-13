import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PrivateRoutingModule } from './private-routing.module';
import * as _components from './components';
import { CoreModule } from '../core/core.module';

const COMPONENTS = [
  _components.LayoutPrimaryComponent,
  _components.SidebarComponent,
  _components.TopbarComponent,
  _components.HeaderComponent,
  _components.UserInfoComponent,
  _components.LanguageDropdownComponent,
  _components.NotificationComponent,
  _components.LangualeFullDropdownComponent,
];

const MODULES = [
  CommonModule,
  CoreModule,
  HttpClientModule,
  NgbCollapseModule,
  MatIconModule,
  PrivateRoutingModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class PrivateModule {}
