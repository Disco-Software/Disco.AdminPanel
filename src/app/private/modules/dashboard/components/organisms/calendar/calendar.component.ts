import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
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

  public state: Array<string> = ['Day', 'Week', 'Month', 'Year'];

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

  public Week: any = [];

  constructor(
    protected ngbCalendar: NgbCalendar,
    private _lsService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.setYearRange();
    this.setWeekData()
    const date: Date = new Date();

    this.state.forEach((s) => {
      this[s].forEach((item, i) => {
        if (i === date['get' + s]()) {
          item.selected = true;
        }
      });
    });
    // console.log(this.Day)
    // console.log(this.Month)
    // console.log(this.Year)
    this.currentState = 'Day'
  }

  setDayData() {

  }

  setWeekData() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const day = new Date()
    let array = []

    // console.log(day.getDay())

    var firstOfMonth = new Date(year, month, 1);
    // console.log(firstOfMonth.getDay())

    var lastOfMonth = new Date(year, month + 1, 0);
    // console.log(lastOfMonth.getDate())
    // console.log(year, ' ', month, ' ', day)
    // for(let i = 1; i <= )

    // console.log(firstOfMonth, firstOfMonth.getDay());

    let tempArray = []

    for(let i = firstOfMonth.getDate(); i <= lastOfMonth.getDate(); i++) {
      const dayInfo = new Date(year, month, i)
      // console.log(dayInfo)
        if(dayInfo.getDay() !== 1) {
          // не понеділок
          const day = {
            label: dayInfo.getDate() + '.' + dayInfo.getMonth() + '.' + dayInfo.getFullYear()
          }
          tempArray = [...tempArray, day]
          // console.log(dayInfo)
        } else {
          //понеділок
          array = [...array, tempArray]
          tempArray = []
          const day = {
            label: dayInfo.getDate() + '.' + dayInfo.getMonth() + '.' + dayInfo.getFullYear()
          }
          tempArray = [...tempArray, day]
          if(i === lastOfMonth.getDate()) {
            array = [...array, tempArray]
          }
          // console.log(dayInfo)
        }

      
      
    }
console.log(array)

    //ініт:
    // зробити масив об'єктів, а не масив масивів({label, selected})
    // визначити selected тиждень
    // протестити з іншими місяцями
  }

  setYearRange(): void {
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

  change(value: 'Next' | 'Back'): void {
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

  getArray(string): Array<any> {
    return this[string];
  }

  setState(item: string) {
    this.currentState = item;
    // if (item === 'Week' && this.Week.length === 0) {
    //   console.log(this.setWeekData());

    // }
  }



  getCurrent(state: string): string {
    return this[state].find(el => el.selected).label;
  }
}
