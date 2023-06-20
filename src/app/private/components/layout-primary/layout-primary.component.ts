import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoadingState } from '@core/states';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout-primary',
  templateUrl: './layout-primary.component.html',
  styleUrls: ['./layout-primary.component.scss']
})
export class LayoutPrimaryComponent {

  isOverview: boolean;

  @Select(LoadingState.isLoading) public isLoading$ : Observable<{isLoading: boolean}>;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url.includes('overview')) {
        this.isOverview = true
      } else {
        this.isOverview = false
      }
  });
  }

}
