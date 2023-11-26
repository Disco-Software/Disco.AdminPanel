import {Component, Input, OnInit} from '@angular/core';

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

  changedValue: string;

  constructor() { }

  ngOnInit(): void {
    this.updateChangedValue()
  }

  updateChangedValue() {
    this.changedValue = this.content
  }

  cancelEdit() {
    this.isEdit = false;
    this.updateChangedValue()
  }

  public onEditClick() {
    this.changedValue = this.content
    this.isEdit = !this.isEdit;
    if(this.inputType === 'password') {
      this.changedValue = ''
    }
  }

  saveChanges() {
    if(this.inputType === 'password') {
      // console.log(this.changedValue)
      //handling password changes
    } else {
      // console.log(this.changedValue)
      //handling email changes
    }
  }
}
