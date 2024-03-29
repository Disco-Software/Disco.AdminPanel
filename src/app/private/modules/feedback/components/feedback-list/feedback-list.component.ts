import {Component, HostListener} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FeedbackChatComponent} from "./components";
import {Select, Store} from "@ngxs/store";
import {FeedbackInterface, FeedbackState, GetAllFeedbacks} from "@core";
import {Observable, take} from "rxjs";

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent {
  @Select(FeedbackState.getAllFeedbacksSelector)
  allFeedbacks$: Observable<FeedbackInterface[]>;

  @Select(FeedbackState.getFeedbacksCountSelector) totalCount$: Observable<number>;

  isArchive: boolean;

  isSmallPaginator: boolean;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.isSmallPaginator = window.innerWidth <= 450
  }

  isChatShown: boolean;

  constructor(private _modalService: NgbModal, private store: Store) {
    this.getScreenSize();
  }
  open(ticket: FeedbackInterface) {
    const ref: NgbModalRef =  this._modalService.open(FeedbackChatComponent, {
    modalDialogClass: 'h-100 w-100 m-0 position-absolute right-0',
    backdrop : 'static',
    keyboard: false,
      size: 'lg',
      animation: false
  });
    ref.componentInstance.ticket = ticket
    ref.componentInstance.isOpen = true;
    ref.componentInstance.closeWindowEmitter.pipe(take(1)).subscribe(() => {
      this.getData(1, 5);
    })
  }

  public onPageChange($event): void {
    if ($event.page) {
      this.getData($event.page + 1, 5);
    } else {
      this.getData($event.first / $event.rows + 1, 5);
    }
  }

  public getData(pageNumber: number, pageSize: number): void {
    this.store.dispatch(new GetAllFeedbacks({pageNumber, pageSize}, this.isArchive)).pipe(take(1));
  }
}
