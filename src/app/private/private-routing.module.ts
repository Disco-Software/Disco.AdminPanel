import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrimaryComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: LayoutPrimaryComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../private/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('../private/modules/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('../private/modules/help/help.module').then(
            (m) => m.HelpModule
          ),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('../private/modules/post/post.module').then(
            (m) => m.PostModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
