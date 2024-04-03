import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {
  AccountItemComponent,
  AccountsHeaderComponent,
  AccountsListComponent,
  CreateUserModalWindowComponent,
  DeleteUserModalWindowComponent,
  ImageCropperModalWindowComponent,
  ModalWindowWrapperComponent,
  PushNotificationsModalWindowComponent,
  SendEmailModalWindowComponent,
  TicketComponent,
  UserInfoCardComponent,
  UserModalWindowComponent
} from './components';
import {SharedModule} from "@shared";
import {CoreModule} from "../../../core";

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
  PushNotificationsModalWindowComponent,
  ModalWindowWrapperComponent,
  ImageCropperModalWindowComponent
];

const MODULES = [CommonModule, AccountRoutingModule, SharedModule, CoreModule];

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
})
export class AccountsModule {}
