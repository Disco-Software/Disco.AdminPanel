import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements AfterViewInit {
  @ViewChild('chatBlock', { static: false }) chatBlock: ElementRef;
  statuses = [
    'feedback.table.body.status.open',
    'feedback.table.body.status.inProgress',
    'feedback.table.body.status.closed',
  ];
  status: string = this.statuses[2]

  constructor(private _activeModal: NgbActiveModal) {
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const chatBlockElement = this.chatBlock.nativeElement;
    chatBlockElement.scrollTop = chatBlockElement.scrollHeight;
  }

  public onClose(): void {
    this._activeModal.close();
  }

}
