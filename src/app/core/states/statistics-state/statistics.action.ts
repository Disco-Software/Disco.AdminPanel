import { StatisticsRequestModel } from '@core/models';

export class StatisticsAction{
  static readonly type = "[Statistics State] statistics state";
  static readonly description = "statistics state";

  constructor(public payload: StatisticsRequestModel) {

  }
}
