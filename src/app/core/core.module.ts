import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RestService } from './services';

const SERVICES = [
  RestService
]

@NgModule({
  declarations: [],
  providers: [
    ...SERVICES
  ],
  imports: [
    CommonModule,
    ...SERVICES,
    ReactiveFormsModule,
  ],
  exports: [
    ...SERVICES,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
