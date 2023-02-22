import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCardComponent } from './post-card/post-card.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedComponent } from './shared/shared.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashbordComponent,
    AccountsListComponent,
    AccountCardComponent,
    PostListComponent,
    PostCardComponent,
    NavMenuComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    MatRippleModule
  ]
})
export class DashbordModule { }
