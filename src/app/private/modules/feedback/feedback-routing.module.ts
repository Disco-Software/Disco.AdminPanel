import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackListComponent} from './components';

const routes: Routes = [
  {path: '', component: FeedbackListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
