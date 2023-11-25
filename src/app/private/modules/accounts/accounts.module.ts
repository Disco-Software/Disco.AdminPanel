import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {
  AccountItemComponent,
  UserModalWindowComponent,
  AccountsHeaderComponent,
  AccountsListComponent,
  CreateUserModalWindowComponent,
  DeleteUserModalWindowComponent,
  ModalWindowWrapperComponent,
  PushNotificationsModalWindowComponent,
  SendEmailModalWindowComponent,
  TicketComponent,
  UserInfoCardComponent
} from './components';
import {SharedModule} from "@shared";

const COMPONENTS = [
  AccountsListComponent,
  UserModalWindowComponent,
  AccountsHeaderComponent,
  DeleteUserModalWindowComponent,
  AccountItemComponent,
  UserInfoCardComponent,
  TicketComponent,
  SendEmailModalWindowComponent,
  CreateUserModalWindowComponent,
  PushNotificationsModalWindowComponent
];

const MODULES = [CommonModule, AccountRoutingModule, SharedModule];

@NgModule({
  declarations: [...COMPONENTS, ModalWindowWrapperComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
