import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '@core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule)
      }
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
