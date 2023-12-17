import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from "ngx-image-cropper";
import {SearchInputComponent} from "./components";
import {CoreModule} from "@core";

const COMPONENTS = [
  SearchInputComponent
]

const MODULES = [
  PrimengModule,
  FormsModule,
  ReactiveFormsModule,
  ImageCropperModule,
  CoreModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
