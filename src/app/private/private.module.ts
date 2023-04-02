import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { LayoutPrimaryComponent } from './components/layout-primary/layout-primary.component';
import { SidebarComponent } from './components/organisms/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TopbarComponent } from './components/organisms/topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/organisms/header/header.component';

@NgModule({
  providers: [
    AuthenticationGuard
  ],
  declarations: [
    LayoutPrimaryComponent,
    SidebarComponent,
    TopbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbCollapseModule,
    MatIconModule,
    FontAwesomeModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
