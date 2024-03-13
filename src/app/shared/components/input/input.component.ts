import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {
  @ViewChild('inputElement') inputElement: any;
  @Output() onInput = new EventEmitter<string>();
  @Output() onSend = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onCloseEdit = new EventEmitter();

  @Input() isLoading: boolean;
  @Input() editableMessage: any;

  public search : string;


  ngOnChanges(changes: SimpleChanges): void {
    if (this.editableMessage) {
      this.search = this.editableMessage.message;
    }
  }

  public onSendButtonClick() {
    if (!this.editableMessage) {
      this.onSend.emit(this.search);
    } else {
      this.onEdit.emit({...this.editableMessage, message: this.search});
    }

  }

  public clearMessageString() {
    this.search = '';
  }

  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }
}
