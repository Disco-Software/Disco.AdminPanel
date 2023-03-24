import { Component, OnInit } from '@angular/core';
import { Routes } from 'src/app/core/models';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faClock, faUsers, faImages, faInfoCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FaIcon } from '@fortawesome/fontawesome-free';
import { Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public dashboardIcon : FaIcon = faClock;
  public accountsIcon: FaIcon = faUsers;
  public postsIcon: FaIcon = faImages;
  public helpIcon: FaIcon = faInfoCircle;
  public menuIcon: FaIcon = faArrowDown;

  public routes : Routes[] = [
    { path: 'dashboard', title: 'Overview', icon: this.dashboardIcon},
    { path: 'accounts', title: 'Accounts', icon: this.accountsIcon},
    { path: 'post', title: 'Posts', icon: this.postsIcon},
    { path: 'help', title: 'Help', icon: this.helpIcon},

  ]

  isShowing : boolean = false;

  constructor(protected router : Router) { }

  ngOnInit(): void {
  }

  public toggleMenu() {
     this.isShowing = !this.isShowing;
     console.log(this.isShowing);
  }



}
