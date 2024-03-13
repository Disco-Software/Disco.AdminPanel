import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @ViewChild('inputElement') inputElement: any;
  @Output() onInput = new EventEmitter<string>();
  @Output() onSend = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();

  @Input() isLoading: boolean;
  @Input() isEdit: boolean;
  @Input() editableMessage : any;

  public search : string;

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isEdit === true) {
      this.search = this.editableMessage.message;
    }
    else {
      this.search = '';
    }
  }

  public onSendButtonClick() {
    this.onSend.emit(this.search);
  }

  public onEditButtonClick() {
    this.onEdit.emit(this.search)
  }

  public clearMessageString() {
    this.search = '';
  }

  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }

  public closeEdit() {
    this.isEdit = !this.isEdit;
  }
}
