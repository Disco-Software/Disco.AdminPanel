import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrimaryComponent } from './components';
import {SidebarResolver} from "../core/resolvers";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview'},
  {
    path: '',
    resolve: [SidebarResolver],
    component: LayoutPrimaryComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
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
        path: 'posts',
        loadChildren: () =>
          import('./modules/posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./modules/feedback/feedback.module').then(
            (m) => m.FeedbackModule
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
