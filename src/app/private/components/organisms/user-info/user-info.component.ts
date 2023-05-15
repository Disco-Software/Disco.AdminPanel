import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services';
import { UserActionModel } from '@core/models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() public userName : String;
  @Input() public userRole : String;
  @Input() public userPhoto : String;
  @Input() public width : String;

  public isOpen : boolean = false;

  userActions : UserActionModel[] = [
    {name: 'Log out', icon: 'logout', onClickEvent: this.logout}
  ]

  constructor(
    private _localStorageService : LocalStorageService,
    private _router : Router,
    private _matIconRegistry : MatIconRegistry,
    private _domSanitizer : DomSanitizer) {
      this._matIconRegistry.addSvgIcon('logout', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_logout.svg'))
    }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public logout() {
    this._localStorageService.removeItem('user');
    this._localStorageService.removeItem('accessToken');
    this._localStorageService.removeItem('refreshToken');

     this._router.navigateByUrl('public/login');
  }

}
