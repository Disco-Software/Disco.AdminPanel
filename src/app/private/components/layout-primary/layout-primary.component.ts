import {Component, ChangeDetectorRef, AfterContentChecked, OnInit} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState, LoadingState } from '@core/states';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import {AppConfigState} from "../../../core/states/app-config-state/app-config.state";
import {LanguageModel} from "@core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-layout-primary',
  templateUrl: './layout-primary.component.html',
  styleUrls: ['./layout-primary.component.scss']
})
export class LayoutPrimaryComponent implements AfterContentChecked, OnInit {
  @Select(AppConfigState.selectedLanguageSelector) language$: Observable<LanguageModel>

  isOverview: boolean;

  loadingBarStatus$: Observable<Array<string>>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private chageDetectionRef : ChangeDetectorRef,
    private _store: Store,
    private _translate: TranslateService

  ) {
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

  ngOnInit(): void {
    this.language$.subscribe(res=>{
      this._translate.use(res.shortCode)
    })
  }
}
