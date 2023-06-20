import { Component, OnInit } from '@angular/core';
import { Routes, User } from '@core/models';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public user : User;
  public routes : Routes[] = [
    { path: 'overview', title: 'sidebar.overview', icon: 'dashboard'},
    { path: 'accounts', title: 'sidebar.accounts', icon: 'accounts'},
    { path: 'post', title: 'sidebar.posts', icon: 'posts'},
    { path: 'help', title: 'sidebar.help', icon: 'help'},
  ]

  isShowing : boolean = false;


  constructor(
    protected _localStorageService: LocalStorageService,
    protected _router : Router,
    protected _matIconRegistry : MatIconRegistry,
    protected _domSanitizer : DomSanitizer,
    private _translate: TranslateService
    ) {
      this._matIconRegistry.addSvgIcon('dashboard', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_dashboard.svg'))
      this._matIconRegistry.addSvgIcon('accounts', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_accounts.svg'))
      this._matIconRegistry.addSvgIcon('posts', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_posts.svg'))
      this._matIconRegistry.addSvgIcon('help', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_help.svg'))
    }

  ngOnInit(): void {
    this.user = this._localStorageService.getItem<User>("user");
    const shortCode : string = this._localStorageService.getItem('language').shortCode;

    this._translate.use(shortCode);
  }

  public toggleMenu() {
     this.isShowing = !this.isShowing;
  }

}
