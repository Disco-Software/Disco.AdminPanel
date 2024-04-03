import {Component, HostListener, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FeedbackChatComponent} from "./components";
import {Select, Store} from "@ngxs/store";
import {map, Observable, take} from "rxjs";
import {FeedbackState, GetAllFeedbacks, GetFeedbacksCountAction} from "@core/states";
import {FeedbackInterface} from "@core/models";

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  @Select(FeedbackState.getAllFeedbacksSelector)
  protected allFeedbacks$: Observable<FeedbackInterface[]>;

  @Select(FeedbackState.getFeedbacksCountSelector)
  private totalCount$: Observable<any>;

  protected isArchived: boolean = false;

  protected archivedCount: number;
  protected activeCount: number;

  protected isSmallPaginator: boolean;

  protected isChatShown: boolean;

  @HostListener('window:resize', ['$event'])
  private getScreenSize(): void {
    this.isSmallPaginator = window.innerWidth <= 450;
  }

  constructor(private _modalService: NgbModal, private store: Store) {
    this.getScreenSize();
  }

  public ngOnInit(): void {
    this.totalCount$.pipe(take(1)).subscribe(res => {
      this.activeCount = res.isActiveCount;
    })
  }

  protected open(ticket: FeedbackInterface): void {
    const ref: NgbModalRef =  this._modalService.open(FeedbackChatComponent, {
    modalDialogClass: 'h-100 w-100 m-0 position-absolute right-0',
    backdrop : 'static',
    keyboard: false,
      size: 'lg',
      animation: false
    });
    ref.componentInstance.ticket = ticket
    ref.componentInstance.isOpen = true;
    ref.componentInstance.closeWindowEmitter.pipe(take(1)).subscribe((): void => {
      this.getData(1, 5);
    })
  }

  protected onPageChange($event): void {
    if ($event.page) {
      this.getData($event.page + 1, 5);
    } else {
      this.getData($event.first / $event.rows + 1, 5);
    }
  }

  protected getData(pageNumber: number, pageSize: number): void {
    this.store.dispatch(new GetFeedbacksCountAction(this.isArchived)).pipe(
      take(1),
      map((res) => res.FeedbackState.count),
    ).subscribe((res): void => {
      if (this.isArchived) {
        this.archivedCount = res.isArchivedCount;
      } else {
        this.activeCount = res.isActiveCount;
      }
      this.store.dispatch(new GetAllFeedbacks({pageNumber, pageSize}, this.isArchived)).pipe(take(1));
    });
  }
}
