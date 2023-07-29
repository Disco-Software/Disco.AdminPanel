import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState, LoadingState } from '@core/states';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout-primary',
  templateUrl: './layout-primary.component.html',
  styleUrls: ['./layout-primary.component.scss']
})
export class LayoutPrimaryComponent implements AfterContentChecked {

  isOverview: boolean;

  loadingBarStatus$: Observable<Array<string>>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  // @Select(LoadingState.isLoading) public isLoading$ : Observable<{isLoading: boolean}>;
  constructor(
    private router: Router,
    private chageDetectionRef : ChangeDetectorRef,
    private _store: Store) {
    this.loadingBarStatus$ = this._store
    .select(LoaderState.getList)
    .pipe(takeUntil(this.destroy$)); //TODO delete after @Select fixed
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url.includes('overview')) {
        this.isOverview = true
      } else {
        this.isOverview = false
      }
  });
  }

  ngAfterContentChecked(): void {
      this.chageDetectionRef.detectChanges();
  }
}
