import { Component, OnInit } from '@angular/core';
import { LocalStorageService, PageService } from '@core/services';
import { PageModel } from '@core/models';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pageModel : PageModel;

  constructor(
    private _localStorageService : LocalStorageService,
    private _router : Router,
    protected _translateService : TranslateService,

    protected _pageService : PageService) { }

  ngOnInit(): void {

    this._translateService.use(this._localStorageService.getItem('language').shortCode);

    this._pageService.setTitle({pageIcon: this._router.url.split('private/')[1], pageName: this._router.url.split('private/',)[1]})

    this._pageService.getTitle().subscribe(pageModel => {this.pageModel = {
      pageName: `sidebar.${pageModel.pageName.toLowerCase()}`,
      pageIcon: pageModel.pageIcon
    }
    console.log(pageModel);
    console.log(this.pageModel.pageName)});
  }
}
