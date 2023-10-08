import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrimaryComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: LayoutPrimaryComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('../private/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./modules/accounts/accounts.module').then(
            (m) => m.AccountsModule
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
        path: 'posts',
        loadChildren: () =>
          import('./modules/posts/posts.module').then(
            (m) => m.PostsModule
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
