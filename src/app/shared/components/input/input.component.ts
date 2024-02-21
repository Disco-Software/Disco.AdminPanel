import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @ViewChild('inputElement') inputElement: any;
  @Output() onInput = new EventEmitter<string>();
  @Output() onSend = new EventEmitter<string>();

  @Input() isLoading: boolean;

  public search : string;

  public onSendButtonClick() {
    this.onSend.emit(this.search);
  }

  public clearMessageString() {
    this.search = '';
  }

  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }
}
