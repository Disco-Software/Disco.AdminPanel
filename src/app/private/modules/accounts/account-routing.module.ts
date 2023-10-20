import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './components';
import { AccountModalComponent } from './organizms/account-modal/account-modal.component';

const routes: Routes = [
  {path: '', component: AccountsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
