import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PrivateRoutingModule } from './private-routing.module';
import * as _components from './components';

const COMPONENTS = [
  _components.LayoutPrimaryComponent,
  _components.SidebarComponent,
  _components.TopbarComponent,
  _components.HeaderComponent,
  _components.UserInfoComponent,
  _components.LanguageDropdownComponent,
];

const MODULES = [
  CommonModule,
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
