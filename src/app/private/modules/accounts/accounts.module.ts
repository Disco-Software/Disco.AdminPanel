import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import * as _components from './components';
import * as _organizms from './organizms'
import { AccountsHeaderComponent } from './organizms/accounts-header/accounts-header.component';
import { AccountItemComponent } from './components/accounts-list/organisms/account-item/account-item.component';
import { DeleteModalComponent } from './organizms/delete-modal/delete-modal.component';
import { PrimeNgModule } from '@shared';
import { CreateUserModalComponent } from './organizms/create-user-modal/create-user-modal.component';

const COMPONENTS = [
  _components.AccountsListComponent,
  _organizms.AccountModalComponent,
  _organizms.AccountsHeaderComponent,
  _organizms.DeleteModalComponent,
  AccountItemComponent
];

const MODULES = [CommonModule, AccountRoutingModule, PrimeNgModule];

@NgModule({
  declarations: [...COMPONENTS, CreateUserModalComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
