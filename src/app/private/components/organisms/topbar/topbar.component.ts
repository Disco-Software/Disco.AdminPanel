import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {LocalStorageService} from '@core/services';
import {Routes, User} from '@core/models';
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Output() isCollapsedEmitter = new EventEmitter<boolean>()

  public routes : Routes[] = [
    { path: 'private/overview', title: 'sidebar.overview', icon: 'overview'},
    { path: 'private/accounts', title: 'sidebar.accounts', icon: 'accounts'},
    { path: 'private/posts', title: 'sidebar.posts', icon: 'posts'},
    { path: 'private/help', title: 'sidebar.help', icon: 'help'},

  ]

  public user : User;

  public isCollapsed: boolean = false;

  constructor(
    protected _localStorageService : LocalStorageService,
    private store: Store,
    protected router : Router,
    protected _matIconRegistry : MatIconRegistry,
    protected _domSanitizer : DomSanitizer) {
      this._matIconRegistry.addSvgIcon('overview', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_dashboard.svg'))
      this._matIconRegistry.addSvgIcon('accounts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_accounts.svg'))
      this._matIconRegistry.addSvgIcon('posts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_posts.svg'))
      this._matIconRegistry.addSvgIcon('help', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_help.svg'))

     }

  ngOnInit(): void {
    this.user = this._localStorageService.getItem<User>('user');
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed
    this.isCollapsedEmitter.emit(this.isCollapsed)
  }

  navigateTo(path: string): void {
    this.isCollapsed = !this.isCollapsed
    this.isCollapsedEmitter.emit(this.isCollapsed)
    this.store.dispatch(new Navigate([path]))
  }
}
