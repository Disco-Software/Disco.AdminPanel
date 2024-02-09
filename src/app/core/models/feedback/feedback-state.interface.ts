import {FeedbackInterface} from "./feedback.interface";

export interface FeedbackStateInterface {
  allFeedbacks: FeedbackInterface[],
  count: number,
  messages: any[],
  isLoading: boolean
}
