import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from '../private/dashbord/components/dashbord/dashbord.component';

const routes: Routes = [
  {path: 'dashbord', children: [
    {path: '', loadChildren: () => import('./private.module').then((m) => m.PrivateModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
