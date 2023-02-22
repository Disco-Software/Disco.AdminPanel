import { Component, OnInit } from '@angular/core';
import { IconDefinition, IconPack, Icon } from '@fortawesome/fontawesome-svg-core';
import { faTable, faUsers, faAddressBook, faStore } from '@fortawesome/free-solid-svg-icons';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  public dashbordIcon = faTable;
  public accountsIcon = faUsers;
  public posts = faAddressBook;
  public stories = faStore;

  constructor() { }

  ngOnInit(): void {
  }

}
