import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() public name : String;
  @Input() public email : String;
  @Input() public photo : String;

  constructor() { }

  ngOnInit(): void {
  }

}
