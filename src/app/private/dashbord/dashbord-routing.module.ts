import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from '../../private/dashbord/components/dashbord/dashbord.component';
import { AccountsListComponent } from '../../private/dashbord/components/accounts-list/accounts-list.component';
import { AccountCardComponent } from '../../private/dashbord/components/account-card/account-card.component';
import { PostListComponent } from '../../private/dashbord/components/post-list/post-list.component';
import { PostCardComponent } from '../../private/dashbord/components/post-card/post-card.component';

const routes: Routes = [
  {path: '', component: DashbordComponent},
  {path: 'accounts', component: AccountsListComponent},
  {path: 'accounts/:id', component: AccountCardComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'posts/:id', component: PostCardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
