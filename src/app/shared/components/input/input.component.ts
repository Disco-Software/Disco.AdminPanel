import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent{

  @Output() onInput = new EventEmitter<string>();
  @Output() onSend = new EventEmitter<string>();

  public search : string;

  public onSendButtonClick() {
    this.onSend.emit(this.search);
  }

  public clearMessageString() {
    this.search = '';
  }
}
