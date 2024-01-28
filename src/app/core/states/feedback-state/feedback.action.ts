import {RequestDataModel} from "@core/models";

export class GetAllFeedbacks {
  public static type = '[Feedback] Get All'

  constructor(public payload: RequestDataModel, public isArchive: boolean) {
  }
}
