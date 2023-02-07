import { Injectable } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { EventData } from '../models/event/event.data.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject$ = new Subject<EventData>();

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
