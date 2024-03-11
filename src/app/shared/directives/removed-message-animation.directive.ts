import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRemovedMessageAnimation]',

})
export class RemovedMessageAnimationDirective {

  @Input() isRemovingMessageAnimation: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRemovingMessageAnimation'].currentValue) {
      this.applyAnimation();
    }
  }

  private applyAnimation(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 1s ease-out');

    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }, 1000); // Припустимо, що анімація триває 1 секунду
  }
}
