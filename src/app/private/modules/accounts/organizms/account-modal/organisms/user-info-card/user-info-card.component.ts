import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public content : string;
  @Input() public isEditable : boolean = true;
  @Input() public inputType : string;

  public isEdit : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onEditClick() {
    this.isEdit = !this.isEdit;
  }

}
