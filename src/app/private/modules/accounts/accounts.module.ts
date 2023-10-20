import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import * as _components from './components';
import * as _organizms from './organizms'
import { AccountsHeaderComponent } from './organizms/accounts-header/accounts-header.component';

const COMPONENTS = [
  _components.AccountsListComponent,
  _organizms.AccountModalComponent,
  _organizms.AccountsHeaderComponent
];

const MODULES = [CommonModule, AccountRoutingModule];

@NgModule({
  declarations: [...COMPONENTS, AccountsHeaderComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
