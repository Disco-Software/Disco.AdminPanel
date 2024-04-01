import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from "ngx-image-cropper";
import {InputComponent, SearchInputComponent} from "./components";
import {
  ClickOutsideDirective,
  ReceivedMessageAnimationDirectiveDirective,
  RemovedMessageAnimationDirective,
  ShowPasswordDirective
} from './directives';
import {CoreModule} from "../core";

const COMPONENTS = [
  SearchInputComponent,
  InputComponent
]

const MODULES = [
  PrimengModule,
  FormsModule,
  ReactiveFormsModule,
  ImageCropperModule,
  CoreModule
];

const DIRECTIVES = [
  ReceivedMessageAnimationDirectiveDirective,
  RemovedMessageAnimationDirective,
  ShowPasswordDirective,
  ClickOutsideDirective
]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ReceivedMessageAnimationDirectiveDirective, RemovedMessageAnimationDirective],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
})
export class SharedModule {}
