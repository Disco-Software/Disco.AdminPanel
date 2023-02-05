import { NgModule } from '@angular/core';
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
    RouterModule,
    CommonModule
  ]
})
export class DashbordModule { }
