import { Component, OnInit } from '@angular/core';
import { PageService } from '@core/services';
import { PageModel } from '@core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pageModel : PageModel;

  constructor(
    protected _translateService : TranslateService,
    protected _pageService : PageService) { }

  ngOnInit(): void {
    this._pageService.getTitle().subscribe(pageModel => this.pageModel = {
      pageName: pageModel.pageName.toLowerCase(),
      pageIcon: pageModel.pageIcon
    });
  }
}
