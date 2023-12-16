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
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModalWindowComponent } from './components/accounts-list/organisms/modal-windows/image-cropper-modal-window/image-cropper-modal-window.component';
import {CoreModule} from "@core";

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

const MODULES = [CommonModule, AccountRoutingModule, SharedModule, CoreModule];

@NgModule({
  declarations: [...COMPONENTS, ModalWindowWrapperComponent, ImageCropperModalWindowComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
