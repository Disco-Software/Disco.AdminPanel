import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsBy } from '../../../../../../core/models/enums/statistics.enum';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerDayView } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-view';

@Component({
  selector: 'disco-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public statisticsBy: StatisticsBy = StatisticsBy.Year;
  public ngbDatePicker: NgbDatepicker;
  public fromDate: Date;
  public toDate: Date;
  public currentState: string;

  public selectedItem: string;

  public state: Array<string> = ['Day', 'Week', 'Month', 'Year'];

  public Months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public day: any = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(protected ngbCalendar: NgbCalendar) {}

  ngOnInit(): void {
    let days = this.ngbCalendar.getMonths();
    console.log(days);
  }

  change(value: 'Next' | 'Back') {

  }

  setState(item: string) {
    console.log(item);
    this.currentState = item;
    switch (this.currentState) {
      case 'Day':
        console.log(this.ngbCalendar.getWeekday(this.ngbCalendar.getToday()));
        this.selectedItem = this.day[this.ngbCalendar.getWeekday(this.ngbCalendar.getToday())]
        console.log(this.selectedItem);
        break;
      case 'Week':
        break;
      case 'Month':
        break;
      case 'Year':
        break;
    }
  }
}
