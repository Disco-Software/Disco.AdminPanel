import {HttpErrorResponse} from '@angular/common/http';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, EMPTY, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {StatisticsService} from './statistics.service';
import {GetStatisticsAction} from './statistics.action';
import {StatisticsModel} from '@core/models';

@State<StatisticsModel>({
  name: "StatisticsState",
  defaults: null,
})
@Injectable()
export class StatisticsState {
  constructor(private _statisticsService: StatisticsService) {}

  @Selector()
  static getStatisticsSelector(result: {
     statistics : StatisticsModel;
  }): StatisticsModel {
    return result.statistics;
  }

  @Action(GetStatisticsAction)
  getStatistics(
    { patchState }: StateContext<{ statistics: StatisticsModel }>,
    { payload }: GetStatisticsAction
  ) {
    return this._statisticsService.getStatistics(payload.fromDate, payload.toDate, payload.statisticsBy.toString(), GetStatisticsAction.type)
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
