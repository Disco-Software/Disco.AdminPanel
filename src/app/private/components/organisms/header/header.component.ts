import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageModel} from '@core/models';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from "rxjs/internal/Subject";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  pageModel: PageModel;

  onDestroy$: Subject<void> = new Subject();

  constructor(
    private _router: Router,
  ) {}

  ngOnInit(): void {
    const pageIdentifier = this._router.url.split('private/')[1];
    this.pageModel = {
      pageName: `sidebar.${pageIdentifier.toLowerCase()}`,
      pageIcon: pageIdentifier,
    };

    this._router.events.pipe(takeUntil(this.onDestroy$)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const pageIdentifier = val.url.split('private/')[1];
        this.pageModel = {
          pageName: `sidebar.${pageIdentifier.toLowerCase()}`,
          pageIcon: pageIdentifier,
        };
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
