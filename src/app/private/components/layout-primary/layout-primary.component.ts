import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoadingState } from 'src/app/core/states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-primary',
  templateUrl: './layout-primary.component.html',
  styleUrls: ['./layout-primary.component.scss']
})
export class LayoutPrimaryComponent {

  @Select(LoadingState.isLoading) public isLoading$ : Observable<{isLoading: boolean}>;

}
