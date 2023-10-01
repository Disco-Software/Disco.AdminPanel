import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LocalStorageService, PageService } from '@core/services';
import { PageModel } from '@core/models';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() isOverview: boolean;
  public pageModel: PageModel;

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router,
    protected _pageService: PageService
  ) {}

  ngOnInit(): void {

    this.setTitle();
  }

  ngOnChanges(): void {
    if (this.isOverview) {
      this.setTitle();
    }
  }

  public setTitle(): void {
    const route = this._router.url.split('private/')[1];
    this._pageService.setTitle({ pageIcon: route, pageName: route });

    this._pageService.getTitle().subscribe((pageModel) => {
      this.pageModel = {
        pageName: `sidebar.${pageModel.pageName.toLowerCase()}`,
        pageIcon: pageModel.pageIcon,
      };
    });
  }
}
