import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../organisms/calendar/calendar.component';
import { PageService } from '../../../../../core/services/page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public title : String;

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName : 'Overview',
      pageIcon : 'dashboard',
    });
  }

}
