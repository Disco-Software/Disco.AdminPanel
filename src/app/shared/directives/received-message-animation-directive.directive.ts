import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReceivedMessageAnimationDirective]'
})
export class ReceivedMessageAnimationDirectiveDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.addReceivedMessageClass();
  }

  addReceivedMessageClass() {
    console.log(this.elementRef.nativeElement);
    this.renderer.addClass(this.elementRef.nativeElement, 'received-message');
  }

}
