import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../core/services/page.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName : 'Accounts',
      pageIcon : 'accounts'
    })
  }

}
