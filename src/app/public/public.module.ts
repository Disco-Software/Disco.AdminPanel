import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CoreModule } from '../core/core.module';
import { NgxsModule } from '@ngxs/store';
import { LoadingState } from '../core/states/loading-state/loading.state';
import { UsersState } from '../core/states/users-state/users.state';

const MODULES = [
  CommonModule,
  CoreModule,
  PublicRoutingModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ]
})
export class PublicModule { }
