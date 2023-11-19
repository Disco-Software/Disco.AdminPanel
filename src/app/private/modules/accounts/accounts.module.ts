import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountsListComponent} from './components';
import {
  AccountModalComponent,
  AccountsHeaderComponent, CreateUserModalComponent,
  DeleteModalComponent,
  SendEmailModalComponent,
  TicketComponent,
  UserInfoCardComponent
} from './organisms'
import {AccountItemComponent} from './components/accounts-list/organisms';
import {SharedModule} from "@shared";

const COMPONENTS = [
  AccountsListComponent,
  AccountModalComponent,
  AccountsHeaderComponent,
  DeleteModalComponent,
  AccountItemComponent,
  UserInfoCardComponent,
  TicketComponent,
  SendEmailModalComponent,
  CreateUserModalComponent
];

const MODULES = [CommonModule, AccountRoutingModule, SharedModule];

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
})
export class AccountsModule {}
