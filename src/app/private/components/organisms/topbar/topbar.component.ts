import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '@core/services';
import { Routes, User } from '@core/models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public routes : Routes[] = [
    { path: 'dashboard', title: 'Overview', icon: 'dashboard'},
    { path: 'accounts', title: 'Accounts', icon: 'accounts'},
    { path: 'post', title: 'Posts', icon: 'posts'},
    { path: 'help', title: 'Help', icon: 'help'},

  ]

  public user : User;

  isShowing : boolean = false;

  constructor(
    protected _localStorageService : LocalStorageService,
    protected router : Router,
    protected _matIconRegistry : MatIconRegistry,
    protected _domSanitizer : DomSanitizer) {
      this._matIconRegistry.addSvgIcon('dashboard', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_dashboard.svg'))
      this._matIconRegistry.addSvgIcon('accounts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_accounts.svg'))
      this._matIconRegistry.addSvgIcon('posts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_posts.svg'))
      this._matIconRegistry.addSvgIcon('help', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_help.svg'))

     }

  ngOnInit(): void {
    this.user = this._localStorageService.getItem<User>('user');
  }

  public toggleMenu() {
     this.isShowing = !this.isShowing;
  }



}
