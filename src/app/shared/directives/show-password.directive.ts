// show-password.directive.ts

import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'input[appShowPassword]',
})
export class ShowPasswordDirective implements OnInit {
  private isPasswordVisible = false;
  private iconElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Огорніть введення контейнером
    this.wrapInput();
    // Додайте іконку при ініціалізації директиви
    this.addShowHideIcon();
  }

  private wrapInput(): void {
    const inputContainer = this.renderer.createElement('div');
    this.renderer.addClass(inputContainer, 'password-container');

    const parent = this.el.nativeElement.parentElement;
    this.renderer.insertBefore(parent, inputContainer, this.el.nativeElement);
    this.renderer.appendChild(inputContainer, this.el.nativeElement);
  }

  private addShowHideIcon(): void {
    const parentElement = this.el.nativeElement.parentElement;

    if (parentElement) {
      this.iconElement = this.renderer.createElement('i');
      this.renderer.addClass(this.iconElement, 'pi');
      this.renderer.setAttribute(this.iconElement, 'class', 'pi pi-eye');
      this.renderer.listen(this.iconElement, 'click', () => this.togglePasswordVisibility());

      this.renderer.appendChild(parentElement.querySelector('.password-container') || parentElement, this.iconElement);
    }
  }

  private togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.updateInputType();
    this.updateIconClass();
  }

  private updateInputType(): void {
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.renderer.setAttribute(this.el.nativeElement, 'type', inputType);
  }

  private updateIconClass(): void {
    const iconClass = this.isPasswordVisible ? 'pi-eye-slash' : 'pi-eye';
    this.renderer.setAttribute(this.iconElement, 'class', `pi ${iconClass}`);
  }
}
