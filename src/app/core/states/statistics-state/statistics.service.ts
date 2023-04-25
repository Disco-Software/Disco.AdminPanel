import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  public getStatistics(fromDate : string, toDate : string, statistics : string) : Observable<any> {
    return null
    // return this.request("GET", 'admin/statistics', {
    //   fromDate : fromDate,
    //   toDate : toDate,
    //   statistics : statistics,
    //  });
  }

}
