import {Directive, ElementRef, EventEmitter, HostListener, Input, Output,} from '@angular/core';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
    @Output() appClickOutside = new EventEmitter<MouseEvent>();
    @Input() additionalClickableSpace: ElementRef | HTMLElement;

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:mousedown', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        if(this.additionalClickableSpace instanceof ElementRef) {
            this.additionalClickableSpace = this.additionalClickableSpace.nativeElement;
        }

        const clickedInside =
            this.elementRef.nativeElement.contains(targetElement) || (this.additionalClickableSpace as HTMLElement)?.contains(targetElement);
        if (!clickedInside) {
            this.appClickOutside.emit(event);
        }
    }
}
