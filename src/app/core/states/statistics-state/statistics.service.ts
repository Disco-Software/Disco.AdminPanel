import { Injectable } from '@angular/core';
import { RestService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private rest: RestService) { }

  public getStatistics(fromDate: string, toDate: string, statistics: string, description: string): Observable<any> {
    return this.rest.request("get", `admin/statistics?from=${fromDate}&to=${toDate}&statistics=${statistics}`, description);
  }

}
