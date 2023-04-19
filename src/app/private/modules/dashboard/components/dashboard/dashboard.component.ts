import { Component, OnInit } from '@angular/core';
import {CalendarComponent, StatisticCardComponent, StatisticSmallCardComponent} from '../organisms'
import { PageService } from '../../../../../core/services/page.service';
import { StatisticModel } from 'src/app/core/models/statistics/statistic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title : String;

  public statisticCards : StatisticModel[] = [
    {title : 'Users', count : 600, icon: 'ic_users', backgroundColor: '#3481CD', textColor: '#F3FEFF'},
    {title : 'New users', count : 600, icon: 'ic_newUsers', backgroundColor: '#5D2AC0', textColor: '#F3FEFF'},
    {title : 'Posts', count : 600, icon: 'ic_posts', backgroundColor: '#2CCBCB', textColor: '#F3FEFF'}
  ]

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName : 'Overview',
      pageIcon : 'dashboard',
    });
  }

}
