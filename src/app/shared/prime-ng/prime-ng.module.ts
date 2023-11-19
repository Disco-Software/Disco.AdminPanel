import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MessageModule } from 'primeng/message'
import {KeyFilterModule} from 'primeng/keyfilter';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';

const MODULES = [
  ToastModule,
  PaginatorModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  AutoCompleteModule,
  MenuModule,
  MessageModule,
  KeyFilterModule
];

const PROVIDERS = [MessageService];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
  providers: [...PROVIDERS],
})
export class PrimeNgModule {}
