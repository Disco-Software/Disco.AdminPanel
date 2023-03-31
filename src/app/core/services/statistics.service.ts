import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { StatisticsResponseModel } from '../models/statistics/statistics.model';
import { UserResponseModel } from '../models/account/user.response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(protected _backendService : BackendService) { }

  public getStatistics(fromDate : string, toDate : string, statistics : string) : Observable<any> {
    return this._backendService.get('admin/statistics', {
      fromDate : fromDate,
      toDate : toDate,
      statistics : statistics,
     });
  }
}
