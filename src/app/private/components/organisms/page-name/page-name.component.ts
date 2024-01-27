import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageModel} from "@core";
import {Subject} from "rxjs/internal/Subject";
import {NavigationEnd, Router} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-page-name',
  templateUrl: './page-name.component.html',
  styleUrls: ['./page-name.component.scss']
})
export class PageNameComponent implements OnInit, OnDestroy {

  pageModel: PageModel;

  onDestroy$: Subject<void> = new Subject();

  constructor(
    private _router: Router,
  ) {}

  ngOnInit(): void {
    const pageIdentifier = this._router.url.split('/')[1];
    this.pageModel = {
      pageName: `sidebar.${pageIdentifier.toLowerCase()}`,
      pageIcon: pageIdentifier,
    };


    this._router.events.pipe(takeUntil(this.onDestroy$)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const pageIdentifier = val.url.split('/')[1];
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
