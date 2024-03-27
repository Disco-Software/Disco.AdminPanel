import {RequestDataModel} from "@core/models";

export class GetAllFeedbacks {
  public static type = '[Feedback] Get All'

  constructor(public payload: RequestDataModel, public isArchive: boolean) {
  }
}

export class GetFeedbacksCountAction {
  static readonly type = '[Feedback] Get Count';
  constructor(public isArchive: boolean) {
  }
}

export class GetFeedbackMessagesAction {
  static readonly type = '[Feedback] Get Feedback Messages';
  constructor(public payload: FeedbackMessagesRequestInterface ) {
  }
}

export class GetFeedbackMessagesCountAction {
  static readonly type = '[Feedback] Get Feedback Messages Count';
  constructor(public ticketId: number) {
  }
}

export interface FeedbackMessagesRequestInterface extends RequestDataModel{
  groupId: number, userId: number
}
