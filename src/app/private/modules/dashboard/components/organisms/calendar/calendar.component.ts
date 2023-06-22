import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerDayView } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-view';
import { StatisticsBy } from '@core/models';
import { LocalStorageService } from '@core/services';

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
  public selectedType: string;

  public state: Array<string> = ['Day', 'Month', 'Year'];

  public Month: any = [
    { label: 'January' },
    { label: 'February' },
    { label: 'March' },
    { label: 'April' },
    { label: 'May' },
    { label: 'June' },
    { label: 'July' },
    { label: 'August' },
    { label: 'September' },
    { label: 'October' },
    { label: 'November' },
    { label: 'December' },
  ];

  public Day: any = [
    { label: 'Sunday' },
    { label: 'Monday' },
    { label: 'Tuesday' },
    { label: 'Wednesday' },
    { label: 'Thursday' },
    { label: 'Friday' },
    { label: 'Saturday' },
  ];

  public Year: any = [];

  constructor(
    protected ngbCalendar: NgbCalendar,
    private _lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getYearRange();
    const date: Date = new Date();

    this.state.forEach((s) => {
      this[s].forEach((item, i) => {
        if (i === date['get' + s]()) {
          item.selected = true;
        }
      });
    });
    this.currentState = 'Day'
  }

  getYearRange(): void {
    const yearOfRegistration = new Date(
      this._lsService.getItem('user').dateOfRegister
    ).getFullYear();
    const yearOfNow = new Date().getFullYear();
    for (let i = yearOfRegistration; i <= yearOfNow; i++) {
      this.Year = [
        ...this.Year,
        { label: i, selected: i === yearOfNow ? true : false },
      ];
    }
  }

  change(value: 'Next' | 'Back') {
    let array = this[this.currentState];
    let selectedIndex = array.findIndex((s) => s.selected);
    //Make circle array start
    array[selectedIndex].selected = false;
    if (value === 'Next') {
      if (array.length - 1 !== selectedIndex) {
        ++selectedIndex;
      } else {
        selectedIndex = 0;
      }
    } else {
      if (selectedIndex !== 0) {
        --selectedIndex;
      } else {
        selectedIndex = array.length - 1;
      }
    }
    array[selectedIndex].selected = true;
  }

  getArray(string) {
    return this[string];
  }

  setState(item: string) {
    this.currentState = item;
  }
}
