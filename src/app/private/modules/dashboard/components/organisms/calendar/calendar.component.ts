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

  public dayEnum: any = [
    { label: 'Monday' },
    { label: 'Tuesday' },
    { label: 'Wednesday' },
    { label: 'Thursday' },
    { label: 'Friday' },
    { label: 'Saturday' },
    { label: 'Sunday' },
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
    private _lsService: LocalStorageService
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
  }

  setDayData(week: { label: string, selected?: boolean }, isInit?: boolean): void {
    this.Day = []
    const selectedWeek = week;
    const firstDayOfTheWeek = selectedWeek.label.split(' - ')[0]
    const lastDayOfTheWeek = selectedWeek.label.split(' - ')[1]
    let firstDay = new Date(firstDayOfTheWeek.split('.').reverse().join(', ')).getDay()
    let lastDay = new Date(lastDayOfTheWeek.split('.').reverse().join(', ')).getDay()
    firstDay = this.changeDayNumber(firstDay)
    lastDay = this.changeDayNumber(lastDay)
    for (let i = firstDay; i <= lastDay; i++) {
      let dayInfo = this.dayEnum[i]
      if (isInit) {
        let today: number = new Date().getDay()
        today = this.changeDayNumber(today)
        if (today === i) {
          dayInfo.selected = true
        }

      } else {
        this.dayEnum.forEach(el => el.selected = false)
      }
      this.Day = [...this.Day, dayInfo]
    }
    if (!isInit) {
      this.Day[0].selected = true
    }
    console.log(this.Day)
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
          label: dayInfo.getDate() + '.' + (dayInfo.getMonth() + 1) + '.' + dayInfo.getFullYear(),
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
          label: dayInfo.getDate() + '.' + (dayInfo.getMonth() + 1) + '.' + dayInfo.getFullYear(),
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
    console.log(this.Week)
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
        this.setDayData(this.Week.find((el)=>el.selected))
        break;
    }
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
