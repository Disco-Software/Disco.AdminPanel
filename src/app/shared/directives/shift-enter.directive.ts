import { Directive, ElementRef, EventEmitter, Host, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appShiftEnter]'
})
export class ShiftEnterDirective {

  @Output() public shiftEnterEmiter = new EventEmitter();

  constructor(private elementRef : ElementRef) { }

  @HostListener('keydown', ['$event'])
  public onKeysDown(event: KeyboardEvent) {
    if(event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      const inputElement = this.elementRef.nativeElement;
      const cursorPosition = inputElement.selectionStart;
      const value = inputElement.value;
      const newValue = value.substring(0, cursorPosition) + '\n' + value.substring(cursorPosition);
      inputElement.value = newValue;
      inputElement.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      this.shiftEnterEmiter.emit();
      console.log("derective");
    }
  }

}
