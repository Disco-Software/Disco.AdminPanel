import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-cropper-modal-window',
  templateUrl: './image-cropper-modal-window.component.html',
  styleUrls: ['./image-cropper-modal-window.component.scss']
})
export class ImageCropperModalWindowComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor() { }

  ngOnInit(): void {
  }


  imageCropped(event: any): void {
    this.croppedImage = event.base64;
  }

  imageLoaded(): void {
    // реакція на завантаження зображення
  }

  cropperReady(): void {
    // реакція на готовність кропера
  }

  loadImageFailed(): void {
    // реакція на невдале завантаження зображення
  }

  uploadCroppedImage(): void {
    // завантаження обрізаного зображення
    // this.croppedImage містить обрізане зображення у форматі base64
  }

}
