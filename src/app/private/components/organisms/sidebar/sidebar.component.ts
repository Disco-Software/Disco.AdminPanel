import {Component, OnInit} from '@angular/core';
import {Routes, User} from '@core/models';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {LocalStorageService} from '@core/services';
import {TranslateService} from '@ngx-translate/core';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {FeedbackState} from "@core/states";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public user : User;
  public routes : Routes[] = [
    { path: 'overview', title: 'sidebar.overview', icon: 'overview'},
    { path: 'accounts', title: 'sidebar.accounts', icon: 'accounts'},
    { path: 'posts', title: 'sidebar.posts', icon: 'posts'},
    { path: 'feedback', title: 'sidebar.feedback', icon: 'feedback', isBadge: true},
  ]

  isShowing : boolean = false;

  @Select(FeedbackState.getFeedbacksCountSelector) totalCount$: Observable<any>;



  constructor(
    protected _localStorageService: LocalStorageService,
    protected _router : Router,
    protected _matIconRegistry : MatIconRegistry,
    protected _domSanitizer : DomSanitizer,
    private _translate: TranslateService
    ) {
      this._matIconRegistry.addSvgIcon('overview', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_dashboard.svg'))
      this._matIconRegistry.addSvgIcon('accounts', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_accounts.svg'))
      this._matIconRegistry.addSvgIcon('posts', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_posts.svg'))
      this._matIconRegistry.addSvgIcon('feedback', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_help.svg'))
    }

  ngOnInit(): void {
    this.user = this._localStorageService.getItem<User>("user");
  }

  public toggleMenu() {
     this.isShowing = !this.isShowing;
  }

}
