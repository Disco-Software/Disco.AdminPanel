import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../core/services/page.service';
import { PageModel } from '../../../../core/models/page/page.model';

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
