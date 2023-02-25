import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { MatSidenav } from '@angular/material/sidenav'
import { MatNavList } from '@angular/material/list'
import { MatExpansionPanel } from '@angular/material/expansion'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
