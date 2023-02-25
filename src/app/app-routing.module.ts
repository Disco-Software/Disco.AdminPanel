import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'public',
    pathMatch: 'full',
  },

  {
    path: 'public',
    children: [
      {path: '', loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)}
    ]
  },

  {
    path: 'private',
    children: [
      {path: '', loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule)}
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
