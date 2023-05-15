import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [PrimeNgModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...MODULES, CommonModule],
  exports: [...MODULES],
})
export class SharedModule {}
