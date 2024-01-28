import {Action, Selector, State, StateContext} from "@ngxs/store";
import {catchError, EMPTY, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {FeedbackService} from "./feedback.service";
import {GetAllFeedbacks} from "./feedback.action";
import {FeedbackInterface, FeedbackStateInterface} from "@core";

@State({
  name: "FeedbackState",
  defaults: {
    allFeedbacks: []
  },
})
@Injectable()
export class FeedbackState {
  constructor(public feedbackService: FeedbackService) {
  }

  @Selector()
  static getAllFeedbacksSelector(state: FeedbackStateInterface): FeedbackInterface[] {
    return state.allFeedbacks;
  }

  @Action(GetAllFeedbacks)
  public getAllFeedbacks(
    {patchState}: StateContext<{}>,
    {payload, isArchive}: GetAllFeedbacks) {
    return this.feedbackService.getAllFeedbacks(payload, isArchive, GetAllFeedbacks.type).pipe(
      catchError(() => {
        return EMPTY;
      }), tap((res: FeedbackInterface[]) => {
        patchState({
          allFeedbacks: res
        });
      }))
  }
}
