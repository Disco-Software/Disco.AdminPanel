import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngxs/store";
import {EditAccountPhotoAction} from "@core";

@Component({
  selector: 'app-image-cropper-modal-window',
  templateUrl: './image-cropper-modal-window.component.html',
  styleUrls: ['./image-cropper-modal-window.component.scss']
})
export class ImageCropperModalWindowComponent {
  @Input() imageChangedEvent: any = '';
  @Input() isAccountPhoto: boolean;
  @Input() id: number;
  @Output() updatedPhoto = new EventEmitter<any>();
  croppedImageBlob: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    private _modal: NgbActiveModal,
    private store: Store,
  ) {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBlob = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }

  saveImage() {
    this.closeModal();

    this.store.dispatch(new EditAccountPhotoAction(this.croppedImageBlob.changingThisBreaksApplicationSecurity, this.id)).subscribe(res => {
      this.updatedPhoto.emit(this.croppedImageBlob);
    })

  }

  closeModal() {
    this._modal.close();
  }

}
