import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  convertToLocaleDateTime(utcDateTimeString: string): string {
    const utcDateTime = DateTime.fromISO(utcDateTimeString, { zone: 'utc' });
    const localDateTime = utcDateTime.toLocal();
    return localDateTime.toISO({ includeMilliseconds: true });
  }
}
