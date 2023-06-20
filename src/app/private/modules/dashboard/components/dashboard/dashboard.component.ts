import { Component, OnInit } from '@angular/core';
import { PageService } from '@core/services';
import { StatisticModel } from '@core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title : String;

  public statisticCards : StatisticModel[] = [
    {title : 'statisticsCard.users', count : 600, icon: 'ic_users', backgroundColor: '#3481CD', textColor: '#F3FEFF'},
    {title : 'statisticsCard.newUsers', count : 600, icon: 'ic_newUsers', backgroundColor: '#5D2AC0', textColor: '#F3FEFF'},
    {title : 'statisticsCard.posts', count : 600, icon: 'ic_posts', backgroundColor: '#2CCBCB', textColor: '#F3FEFF'}
  ]

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName : 'Overview',
      pageIcon : 'overview',
    });
  }

}
