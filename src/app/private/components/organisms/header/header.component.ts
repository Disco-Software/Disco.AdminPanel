import { Component, OnInit } from '@angular/core';
import { PageService } from '@core/services';
import { PageModel } from '@core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pageModel : PageModel;

  constructor(protected _pageService : PageService) { }

  ngOnInit(): void {
    this._pageService.getTitle().subscribe(pageModel => this.pageModel = pageModel);
  }
}
