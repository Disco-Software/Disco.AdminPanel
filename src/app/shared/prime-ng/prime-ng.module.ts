import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MessageModule } from 'primeng/message'
import {KeyFilterModule} from 'primeng/keyfilter'; 

const MODULES = [ToastModule, PaginatorModule, MessageModule, KeyFilterModule];

const PROVIDERS = [MessageService];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
  providers: [...PROVIDERS],
})
export class PrimeNgModule {}
