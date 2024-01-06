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
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';


const MODULES = [
  ToastModule,
  PaginatorModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  AutoCompleteModule,
  MenuModule,
  MessageModule,
  KeyFilterModule,
  DropdownModule,
  DialogModule,
  TableModule,
  TagModule,
  BadgeModule
];

const PROVIDERS = [MessageService];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
  providers: [...PROVIDERS],
})
export class PrimengModule {}
