import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutPrimaryComponent } from './components/layout-primary/layout-primary.component';
import { SidebarComponent } from './components/organisms/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  providers: [
    AuthenticationGuard
  ],
  declarations: [
    LayoutPrimaryComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    FontAwesomeModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
