import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsBy } from '@core/models';
import { LocalStorageService } from '@core/services';
import { Store } from '@ngxs/store';
import { StatisticsAction } from '@core/states';

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

  public dayEnum: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

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

  public Day: any = []

  public Year: any = [];

  public Week: any = [];

  constructor(
    protected ngbCalendar: NgbCalendar,
    private _lsService: LocalStorageService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const date: Date = new Date();
    this.setYearRange();
    this.setWeekData(new Date().getFullYear(), new Date().getMonth(), new Date())
    this.setDayData(this.Week.find((el) => el.selected), true);

    this.state.forEach((s) => {
      if (s !== 'Week' && s !== 'Day') {
        this[s].forEach((item, i) => {
          if (i === date['get' + s]()) {
            item.selected = true;
          }
        });
      }

    });
    this.currentState = 'Day'
    const day = new Date(this.Day.find(d=>d.selected).date.split('.').reverse().join(', '))
    const req = {
      fromDate: new Date(day.setHours(0, 0, 0, 0)).toISOString(),
      toDate: new Date(day.setHours(23, 59, 59, 999)).toISOString(),
      statisticsBy: this.currentState
    }

    this.store.dispatch(new StatisticsAction(req));
  }

  dateList(start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;

  }

  setDayData(week: { label: string, selected?: boolean }, isInit?: boolean): void {
    const selectedWeek = week.label
    if (selectedWeek.includes(' - ')) {
      //set day array if we have more than one day in the week
      this.Day = []
      const firstDayOfTheWeek = selectedWeek.split(' - ')[0]
      const lastDayOfTheWeek = selectedWeek.split(' - ')[1]
      var daylist = this.dateList(new Date(firstDayOfTheWeek.split('.').reverse().join(', ')), new Date(lastDayOfTheWeek.split('.').reverse().join(', ')));
      daylist.forEach((d) => {
        const dayIndex = this.changeDayNumber(d.getDay())
        this.Day = [...this.Day, {
          date: d.toLocaleDateString(),
          selected: isInit && dayIndex === this.changeDayNumber(new Date().getDay()),
          label: this.dayEnum[dayIndex]
        }]
      })
      if (!isInit) {
        //set monday as selected day
        this.Day[0].selected = true
      }
    } else {
      //set day array if we have only one day in the week
      const dayOfTheWeek = selectedWeek
      const dayIndex = this.changeDayNumber(new Date(dayOfTheWeek.split('.').reverse().join(', ')).getDay())
      this.Day = [{
        date: dayOfTheWeek,
        selected: true,
        label: this.dayEnum[dayIndex]
      }]
    }
  }

  changeDayNumber(day: number): number {
    return day === 0 ? day = 6 : --day;
  }

  setWeekData(year: number, month: number, day?: Date): void {
    let monthData = [];

    var firstOfMonth = new Date(year, month, 1);

    var lastOfMonth = new Date(year, month + 1, 0);

    let weekData = []

    for (let i = firstOfMonth.getDate(); i <= lastOfMonth.getDate(); i++) {
      const dayInfo = new Date(year, month, i)
      if (dayInfo.getDay() !== 1) {
        // не понеділок

        //створюємо інформацію про день
        let labelInfo = {
          label: dayInfo.toLocaleDateString(),
          selected: false
        }

        // перевіряємо чи ітерабельний день - це сьогодні
        if (day && day.getDate() === dayInfo.getDate()) {
          labelInfo.selected = true;
        }

        // додаємо інформацію про день в масив тижня
        weekData = [...weekData, labelInfo]

        // додати тиждень в загальний масив, якщо зараз останній день місяця
        if (i === lastOfMonth.getDate()) {
          monthData = [...monthData, {
            label: weekData.length !== 1 ? weekData[0].label + ' - ' + weekData.at(-1).label : weekData[0].label,
            selected: !!weekData.find(el => el.selected)
          }]
        }
      } else {
        //понеділок

        // коли наступає понеділок - додаємо інформацію зі всього минулого тижня в загальний масив місяця
        monthData = [...monthData, {
          label: weekData.length !== 1 ? weekData[0].label + ' - ' + weekData.at(-1).label : weekData[0].label,
          selected: !!weekData.find(el => el.selected)
        }]

        // після того, як додали інформацію про минулий тиждень, очищуємо масив тижня, щоб створювати в ньому наступний масив тижня
        weekData = []

        //створюємо інформацію про день
        const labelInfo = {
          label: dayInfo.toLocaleDateString(),
          selected: false
        }

        // перевіряємо чи ітерабельний день - це сьогодні
        if (day && day.getDate() === dayInfo.getDate()) {
          labelInfo.selected = true;
        }

        // додаємо інформацію про день в масив тижня
        weekData = [...weekData, labelInfo]

        // перевіряємо чи цей понеділок - це не останній день місяця. якщо останній, то додаємо про нього інформацію в загальний масив
        if (i === lastOfMonth.getDate()) {
          monthData = [...monthData, {
            label: weekData.length !== 1 ? weekData[0].label + ' - ' + weekData.at(-1).label : weekData[0].label,
            selected: !!weekData.find(el => el.selected)
          }]
        }
      }



    }
    // якщо ми не передали день як аргумент, це означає, що ми перегенеровуємо масив тижнів і ми маємо задати selected тиждень як перший
    if (!day) {
      monthData[0].selected = true
    }

    this.Week = monthData;
    // this.setDayData(this.Week.find(el => el.selected));
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


    // перегенерація даних, якщо ми змінюємо інший стейт
    switch (this.currentState) {
      case 'Month':
      case 'Year':
        this.setWeekData(this.Year.find(el => el.selected).label, this.Month.findIndex(el => el.selected));
        this.setDayData(this.Week.find((el) => el.selected));
        break;
      case 'Week':
        this.setDayData(this.Week.find((el) => el.selected))
        break;
    }

    let req = {
      fromDate: '',
      toDate: '',
      statisticsBy: ''
    }
    switch (this.currentState) {
      case 'Day':
        const day = new Date(this.Day.find(d=>d.selected).date.split('.').reverse().join(', '))
        req = {
          fromDate: new Date(day.setHours(0, 0, 0, 0)).toISOString(),
          toDate: new Date(day.setHours(23, 59, 59, 999)).toISOString(),
          statisticsBy: this.currentState
        }
        break;
      case 'Week':
        const week = this.Week.find(w => w.selected).label
        if (week.includes(' - ')) {
          const firstDayOfTheWeek = week.split(' - ')[0]
          const lastDayOfTheWeek = week.split(' - ')[1]
          req = {
            fromDate: new Date(firstDayOfTheWeek.split('.').reverse()).toISOString(),
            toDate: new Date(lastDayOfTheWeek.split('.').reverse()).toISOString(),
            statisticsBy: this.currentState
          }
        } else {
          const day = new Date(week.split('.').reverse());
          req = {
            fromDate: new Date(day.setHours(0, 0, 0, 0)).toISOString(),
            toDate: new Date(day.setHours(23, 59, 59, 999)).toISOString(),
            statisticsBy: this.currentState
          }
        }
        break;
      case 'Month':
        const year = this.Year.find(y => y.selected).label
        const month = this.Month.findIndex(m => m.selected)
        req = {
          fromDate: new Date(year, month, 1).toISOString(),
          toDate: new Date(year, month + 1, 1).toISOString(),
          statisticsBy: this.currentState
        }
        break;
      case 'Year':
        req = {
          fromDate: new Date(this.Year.find(y => y.selected).label, 0, 1).toISOString(),
          toDate: new Date(this.Year.find(y => y.selected).label + 1, 0, 1).toISOString(),
          statisticsBy: this.currentState
        }
        break;
    }
    this.store.dispatch(new StatisticsAction({ ...req }))
  }

  getArray(string): Array<any> {
    return this[string];
  }

  setState(item: string) {
    this.currentState = item;
  }



  getCurrent(state: string): string {
    return this[state].find(el => el.selected).label;
  }
}
