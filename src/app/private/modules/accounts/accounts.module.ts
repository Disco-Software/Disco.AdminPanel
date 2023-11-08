import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import * as _components from './components';
import * as _organizms from './organizms'
import { AccountsHeaderComponent } from './organizms/accounts-header/accounts-header.component';
import { AccountItemComponent } from './components/accounts-list/organisms/account-item/account-item.component';
import { DeleteModalComponent } from './organizms/delete-modal/delete-modal.component';
import {PrimeNgModule, SharedModule} from '@shared';
import { CreateUserModalComponent } from './organizms/create-user-modal/create-user-modal.component';
import { AccountModalComponent } from './organizms/account-modal/account-modal.component';
import { UserInfoCardComponent } from './organizms/account-modal/organisms/user-info-card/user-info-card.component';
import { TicketComponent } from './organizms/account-modal/organisms/ticket/ticket.component';
import { SendEmailModalComponent } from './organizms/send-email-modal/send-email-modal.component';

const COMPONENTS = [
  _components.AccountsListComponent,
  _organizms.AccountModalComponent,
  _organizms.AccountsHeaderComponent,
  _organizms.CreateUserModalComponent,
  _organizms.DeleteModalComponent,
  AccountItemComponent
];

const MODULES = [CommonModule, AccountRoutingModule, SharedModule];

@NgModule({
  declarations: [...COMPONENTS, UserInfoCardComponent, TicketComponent, SendEmailModalComponent],
  imports: [...MODULES],
})
export class AccountsModule {}
