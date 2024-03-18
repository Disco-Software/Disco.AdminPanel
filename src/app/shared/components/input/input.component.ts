import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';

export const slideUpDownAnimation = trigger('slideUpDown', [
  state('closed', style({
    opacity: '0',
    transform: 'translateY(0)'
  })),
  state('opened', style({
    opacity: '1',
    transform: 'translateY(-48px)'
  })),
  transition('closed => opened', animate('.5s', keyframes([
    style({ opacity: '0', transform: 'translateY(0)', offset: 0 }),
    style({ opacity: '1', transform: 'translateY(-48px)', offset: 1 })
  ]))),
  transition('opened => closed', animate('.5s', keyframes([
    style({ opacity: '1', transform: 'translateY(-48px)', offset: 0 }),
    style({ opacity: '0', transform: 'translateY(0)', offset: 1 })
  ])))
]);

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [
    slideUpDownAnimation
  ]
})
export class InputComponent implements OnChanges {
  @ViewChild('inputElement') inputElement: any;
  @Output() onInput = new EventEmitter<string>();
  @Output() onSend = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onCloseEdit = new EventEmitter();

  @Input() isLoading: boolean;
  @Input() editableMessage: any;

  hasEdited : boolean = false;

  public search : string;


  ngOnChanges(changes: SimpleChanges): void {
    if (this.editableMessage) {
      this.hasEdited = true;
      this.search = this.editableMessage.message;
      setTimeout((): void => {
        this.focusInput();
      })
    }
  }

  public onSendButtonClick() {
    if (!this.editableMessage) {
      this.onSend.emit(this.search);
    } else {

      this.onEdit.emit({...this.editableMessage, message: this.search});
      setTimeout(() => {
        // this.hasEdited = false;
      }, 500);
    }

  }

  public onCloseEditBar() {
    this.hasEdited = false;
    this.onCloseEdit.emit();
  }

  public clearMessageString() {
    this.search = '';
  }

  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }
}
