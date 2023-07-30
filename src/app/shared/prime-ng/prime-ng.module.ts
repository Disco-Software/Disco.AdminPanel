import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';


const MODULES = [ToastModule, ChartModule];

const PROVIDERS = [MessageService];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
  providers: [...PROVIDERS],
})
export class PrimeNgModule {}
