import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Account, AccountAction, EditAccountEmailAction } from '@core';
import { Select, Store } from '@ngxs/store';
import { ChangeEmailRequestDto } from '../../../../../../../../../../core/models/account/change-email-request.model';
import { ChangeEmailResponseModel } from 'src/app/core/models/account/change-email-response.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {
  @Input() public id : number;
  @Input() public title: string;
  @Input() public content : string;
  @Input() public isEditable : boolean = true;
  @Input() public inputType : string;

  public isEdit : boolean = false;

  changedValue: string;

  constructor(private _store : Store) { }

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
      console.log("password");
    } else {
      const req : ChangeEmailRequestDto = {
        email : this.changedValue,
        id: this.id
      };
      console.log(req);

     this._store.dispatch(new EditAccountEmailAction(req)).pipe(take(1)).subscribe(() => {
      this.isEdit = false;
     });
    }
  }
}
