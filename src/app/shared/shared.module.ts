import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from "ngx-image-cropper";
import {InputComponent, SearchInputComponent} from "./components";
import {CoreModule} from "@core";
import {ClickOutsideDirective, ShowPasswordDirective} from './directives';
import { ReceivedMessageAnimationDirectiveDirective } from './directives/received-message-animation-directive.directive';
import { RemovedMessageAnimationDirective } from './directives/removed-message-animation.directive';

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
