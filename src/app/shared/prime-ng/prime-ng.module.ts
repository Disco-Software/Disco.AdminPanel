import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

const MODULES = [
  ToastModule
]

const PROVIDERS = [
  MessageService,
]

@NgModule({
  declarations: [],
  providers: [
    ...PROVIDERS,
  ],
  imports: [
    ...MODULES,
    CommonModule
  ],
  exports: [
    ...MODULES
  ]
})
export class PrimeNgModule { }
