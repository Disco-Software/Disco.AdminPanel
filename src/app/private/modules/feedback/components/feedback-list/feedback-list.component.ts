import {Component, HostListener} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FeedbackChatComponent} from "./components";
import {Select} from "@ngxs/store";
import {FeedbackInterface, FeedbackState} from "@core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent {
  @Select(FeedbackState.getAllFeedbacksSelector)
  allFeedbacks$: Observable<FeedbackInterface[]>;
  isSmallPaginator: boolean;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.isSmallPaginator = window.innerWidth <= 450
  }

  isChatShown: boolean;

  constructor(private _modalService : NgbModal) {
    this.getScreenSize();
  }
  open() {
    const ref =  this._modalService.open(FeedbackChatComponent, {
    modalDialogClass: 'h-100 w-100 m-0 position-absolute right-0',
    backdrop : 'static',
    keyboard: false,
      size: 'lg',
      animation: true
  });

  }

  ngOnInit() {

  }
}
