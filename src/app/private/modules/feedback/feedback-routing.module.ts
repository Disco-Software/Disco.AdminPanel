import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeedbackListComponent} from './components';
import {FeedbackResolver} from "../../../core/resolvers";

const routes: Routes = [
  {
    path: '',
    component: FeedbackListComponent,
    resolve: [FeedbackResolver]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
