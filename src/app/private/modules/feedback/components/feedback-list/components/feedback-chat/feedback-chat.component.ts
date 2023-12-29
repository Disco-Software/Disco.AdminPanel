import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-feedback-chat',
  templateUrl: './feedback-chat.component.html',
  styleUrls: ['./feedback-chat.component.scss']
})
export class FeedbackChatComponent implements OnInit {

  status = 'closed'
  constructor(private _activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  public onClose() : void{
    this._activeModal.close();
  }

}
