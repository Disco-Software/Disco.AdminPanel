import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsListComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: AccountsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
