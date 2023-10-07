import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { StatisticsAction } from './statistics.action';
import { StatisticsModel } from '../../models/statistics/statistics.model';
@State<StatisticsModel>({
  name: "StatisticsState",
  defaults: null,
})
@Injectable()
export class StatisticsState {
  constructor(private _statisticsService: StatisticsService) {}

  @Selector()
  static getStatistics(result: {
     statistics : StatisticsModel;
  }): StatisticsModel {
    return result.statistics;
  }

  @Action(StatisticsAction)
  getUserInfo(
    { patchState }: StateContext<{ statistics: StatisticsModel }>,
    { payload }: StatisticsAction
  ) {
    return this._statisticsService.getStatistics(payload.fromDate, payload.toDate, payload.statisticsBy.toString(), StatisticsAction.description)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: StatisticsModel) => {
          patchState({ statistics: response});
        })
      );
  }
}
