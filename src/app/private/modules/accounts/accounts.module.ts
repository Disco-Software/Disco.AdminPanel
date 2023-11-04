import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import * as _components from './components';
import * as _organisms from './organisms'
import { AccountsHeaderComponent } from './organisms/accounts-header/accounts-header.component';
import { AccountItemComponent } from './components/accounts-list/organisms/account-item/account-item.component';
import { DeleteModalComponent } from './organisms/delete-modal/delete-modal.component';
import {PrimeNgModule, SharedModule} from '@shared';
import { CreateUserModalComponent } from './organisms/create-user-modal/create-user-modal.component';

const COMPONENTS = [
  _components.AccountsListComponent,
  _organisms.AccountModalComponent,
  _organisms.AccountsHeaderComponent,
  _organisms.DeleteModalComponent,
  AccountItemComponent
];

const MODULES = [CommonModule, AccountRoutingModule, SharedModule];

@NgModule({
  declarations: [...COMPONENTS, CreateUserModalComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
