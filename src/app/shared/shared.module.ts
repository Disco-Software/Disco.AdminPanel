import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng';

const MODULES = [
  PrimeNgModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
    CommonModule
  ],
  exports: [
    ...MODULES,
  ]
})
export class SharedModule { }
