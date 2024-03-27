import {Action, Selector, State, StateContext} from "@ngxs/store";
import {catchError, EMPTY, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {FeedbackService} from "./feedback.service";
import {
  GetAllFeedbacks,
  GetFeedbackMessagesAction,
  GetFeedbackMessagesCountAction,
  GetFeedbacksCountAction
} from "./feedback.action";
import {FeedbackInterface, FeedbackStateInterface, GetAccountsCountAction} from "@core";
import {HttpErrorResponse} from "@angular/common/http";

@State({
  name: "FeedbackState",
  defaults: {
    allFeedbacks: [],
    count: null,
    messages: null,
    isLoading: true,
    messagesCount: 0
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

  @Selector()
  static getFeedbacksCountSelector(state: FeedbackStateInterface): number {
    return state.count
  }

  @Selector()
  static isLoadingSelector(state: FeedbackStateInterface): boolean {
    return state.isLoading;
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

  @Action(GetFeedbacksCountAction)
  public getFeedbacksCount(
    {patchState}: StateContext<{ count: number }>,
    {isArchive}: GetFeedbacksCountAction
  ) {
    return this.feedbackService.getFeedbacksCount(isArchive, GetAccountsCountAction.type)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return EMPTY;
        }),
        tap((response: number) => {
          patchState({count: response});
        }))
  }

  @Action(GetFeedbackMessagesAction)
  public getFeedbackMessagesAction(
    {patchState}: StateContext<any>,
    {payload}: GetFeedbackMessagesAction
  ) {
    patchState({isLoading: true})
    return this.feedbackService.getFeedbackMessages(payload, GetAccountsCountAction.type)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          patchState({isLoading: false})
          return EMPTY;
        }),
        tap((response: number) => {
          patchState({isLoading: false})
          patchState({messages: response});
        }))
  }

  @Action(GetFeedbackMessagesCountAction)
  public getFeedbackMessagesCountAction(
    {patchState}: StateContext<any>,
    {ticketId}: GetFeedbackMessagesCountAction
  ) {
    patchState({isLoading: true})
    return this.feedbackService.getFeedbackMessagesCount(ticketId, GetAccountsCountAction.type)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          patchState({isLoading: false})
          return EMPTY;
        }),
        tap((response: number) => {
          patchState({isLoading: false})
          patchState({messagesCount: response});
        }))
  }
}
