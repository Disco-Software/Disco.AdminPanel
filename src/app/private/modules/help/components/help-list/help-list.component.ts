import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../core/services/page.service';

@Component({
  selector: 'app-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.scss']
})
export class HelpListComponent implements OnInit {

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName: 'Help',
      pageIcon: 'help'
    })
  }

}
