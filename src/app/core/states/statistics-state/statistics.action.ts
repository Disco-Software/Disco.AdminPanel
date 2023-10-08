import { StatisticsRequestModel } from '@core/models';

export class GetStatisticsAction {
  static readonly type = "[Statistics State] get statistics";

  constructor(public payload: StatisticsRequestModel) {

  }
}
