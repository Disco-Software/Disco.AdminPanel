import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { StatisticsResponseModel } from '../../models/statistics/statistics.model';
import { StatisticsAction } from './statistics.action';
@State<StatisticsResponseModel>({
  name: "StatisticsState",
  defaults: null,
})
@Injectable()
export class StatisticsState {
  constructor(private _statisticsService: StatisticsService) {}

  @Selector()
  static getStatistics(result: {
     statistics : StatisticsResponseModel;
  }): StatisticsResponseModel {
    return result.statistics;
  }

  @Action(StatisticsAction)
  getUserInfo(
    { patchState }: StateContext<{ statistics: StatisticsResponseModel }>,
    { payload }: StatisticsAction
  ) {
    return this._statisticsService.getStatistics(payload.fromDate, payload.toDate, payload.statisticsBy.toString())
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: StatisticsResponseModel) => {
          patchState({ statistics: response});
        })
      );
  }
}
