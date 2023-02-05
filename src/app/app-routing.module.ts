import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './components/account/account.module';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { LoginComponent } from './components/account/login/login.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { AccountCardComponent } from './components/dashbord/account-card/account-card.component';
import { AccountsListComponent } from './components/dashbord/accounts-list/accounts-list.component';
import { DashbordComponent } from './components/dashbord/dashbord/dashbord.component';
import { NavMenuComponent } from './components/dashbord/nav-menu/nav-menu.component';
import { PostCardComponent } from './components/dashbord/post-card/post-card.component';
import { PostListComponent } from './components/dashbord/post-list/post-list.component';
import { SharedComponent } from './components/dashbord/shared/shared.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'log-in', component: LoginComponent },
  { path: 'password/forgot', component: ForgotPasswordComponent },
  { path: 'password/reset', component: ResetPasswordComponent },
  {
    path: '', component: SharedComponent, pathMatch: 'full', children: [
      { path: 'dashbord', component: DashbordComponent },
      { path: 'acccount/list', component: AccountsListComponent },
      { path: 'account/:id', component: AccountCardComponent },
      { path: 'post/list', component: PostListComponent },
      { path: 'post/:id', component: PostCardComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
