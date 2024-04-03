import {Component, ContentChild, TemplateRef} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-window-wrapper',
  templateUrl: './modal-window-wrapper.component.html',
  styleUrls: ['./modal-window-wrapper.component.scss']
})
export class ModalWindowWrapperComponent {
  @ContentChild('title') title: TemplateRef<any>;
  @ContentChild('body') body: TemplateRef<any>;
  @ContentChild('buttons') buttons: TemplateRef<any>;

  constructor(private _modal: NgbActiveModal) {
  }

  protected closeModal(): void {
    this._modal.close();
  }
}
