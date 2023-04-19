import { StatisticsBy } from "../../models/enums/statistics.enum";
import { StatisticsRequestModel } from '../../models/statistics/statistics.request.model';

export class StatisticsAction{
  static readonly type = "[Statistics State] statistics state";
  static readonly description = "statistics state";

  constructor(public payload: StatisticsRequestModel) {

  }
}
