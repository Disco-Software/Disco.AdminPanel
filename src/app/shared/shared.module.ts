import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from "ngx-image-cropper";
import {InputComponent, SearchInputComponent} from "./components";
import {CoreModule} from "@core";
import {ShowPasswordDirective} from './directives';

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
  ShowPasswordDirective,
]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
})
export class SharedModule {}
