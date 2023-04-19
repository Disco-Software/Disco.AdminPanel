import { Injectable } from '@angular/core';
import { BackendService } from '../../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private _backendService: BackendService) { }

  public getStatistics(fromDate : string, toDate : string, statistics : string) : Observable<any> {
    return this._backendService.get('admin/statistics', {
      fromDate : fromDate,
      toDate : toDate,
      statistics : statistics,
     });
  }

}
