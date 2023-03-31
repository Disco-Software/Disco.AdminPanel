import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpListComponent } from './components/help-list/help-list.component';

const routes: Routes = [
  {path: '', component: HelpListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
