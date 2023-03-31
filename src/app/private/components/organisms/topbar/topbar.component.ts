import { Component, OnInit } from '@angular/core';
import { Routes } from 'src/app/core/models';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faImages, faInfoCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FaIcon } from '@fortawesome/fontawesome-free';
import { Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  isShowing : boolean = false;

  constructor(
    protected router : Router,
    protected _matIconRegistry : MatIconRegistry,
    protected _domSanitizer : DomSanitizer) {
      this._matIconRegistry.addSvgIcon('dashboard', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_dashboard.svg'))
      this._matIconRegistry.addSvgIcon('accounts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_accounts.svg'))
      this._matIconRegistry.addSvgIcon('posts', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_posts.svg'))
      this._matIconRegistry.addSvgIcon('help', this._domSanitizer.bypassSecurityTrustUrl('../../../../../assets/images/ic_help.svg'))

     }

  ngOnInit(): void {
  }

  public toggleMenu() {
     this.isShowing = !this.isShowing;
     console.log(this.isShowing);
  }



}
