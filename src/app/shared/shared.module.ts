import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from './prime-ng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from "ngx-image-cropper";
import {TranslateModule} from "@ngx-translate/core";

const MODULES = [
  PrimeNgModule,
  FormsModule,
  ReactiveFormsModule,
  ImageCropperModule
];

@NgModule({
  declarations: [],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES],
})
export class SharedModule {}
