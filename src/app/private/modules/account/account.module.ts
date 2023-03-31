import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountsListComponent, AccountComponent } from './components';


@NgModule({
  declarations: [
    AccountsListComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
