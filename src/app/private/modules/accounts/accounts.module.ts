import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import * as _components from './components';

const COMPONENTS = [
  _components.AccountsListComponent,
  _components.AccountComponent,
];

const MODULES = [CommonModule, AccountRoutingModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class AccountsModule {}
