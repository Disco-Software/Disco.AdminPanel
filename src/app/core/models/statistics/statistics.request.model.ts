import { StatisticsBy } from "../enums/statistics.enum";

export interface StatisticsRequestModel{
  fromDate: string;
  toDate: string;
  statisticsBy: StatisticsBy
}
