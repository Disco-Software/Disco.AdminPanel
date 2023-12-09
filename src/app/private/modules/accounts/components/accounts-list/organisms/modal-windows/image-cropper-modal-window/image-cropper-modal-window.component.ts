import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
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
  @Output() updatedPhoto = new EventEmitter<any>();
  croppedImageFile: any = '';
  croppedImageBlob: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    private _modal: NgbActiveModal,
    private store: Store,
  ) {
  }

  // imageCropped(event: ImageCroppedEvent) {
  //
  //   this.croppedImageBlob = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  //   this.croppedImageFile = new File([event.objectUrl], "photo");
  //
  //   // event.blob can be used to upload the cropped image
  // }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }
  imageCropped(event: ImageCroppedEvent) {
    // Convert the base64 data to a Blob
    // console.log(event)
    this.croppedImageBlob = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // this.croppedImageFile = this.dataURItoBlob(event.base64);
    // Use the cropped image as needed
  }

// Helper function to convert base64 to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
  saveImage() {
    this.closeModal();
    // this.store.dispatch(new EditAccountPhotoAction(this.croppedImageFile)).subscribe(res=>{
    //   console.log(res)
      this.updatedPhoto.emit(this.croppedImageBlob);
    // })

  }

  closeModal() {
    this._modal.close();
  }

}
