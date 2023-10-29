import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CreateAccountModel } from 'src/app/core/models/account/create-account.model';
import { SearchType } from 'src/app/core/models/calendar';
import { BooleanLiteral } from 'typescript/lib/tsserverlibrary';
import { CreateAccountAction } from '../../../../../core/states/accounts-state/create.action';
import { CreateUserResponseModel } from 'src/app/core/models/account/create-account-response.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  public currentState : string;

  public states : SearchType[] = [
    { name: "Admin", title: "Administrator"},
    { name: "User", title: "User"},
  ];

  public form : FormGroup = new FormGroup({
    role : new FormControl('', [Validators.required]),
    userName : new FormControl('', [Validators.required ]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private _activeModal : NgbActiveModal, private _store : Store) { }

  ngOnInit(): void {
    this.currentState = 'Admin';

    this.form.value.role = this.currentState;
  }

  public setState(item : string) : void {
    this.currentState = item;

    this.form.value.role = this.currentState;
  }

  public onCloseClick() : void{
    this._activeModal.close();
  }

  public onSubmit() : void {
    const req : CreateAccountModel = {
      role : this.form.value.role.toString(),
      userName : this.form.value.userName,
      email : this.form.value.email,
      password : this.form.value.password,
      confirmPassword : this.form.value.confirmPassword
    };

    this._store.dispatch(new CreateAccountAction(req))
         .pipe()
         .subscribe((res : CreateUserResponseModel) => {
            console.log(res);
            this._activeModal.close();
         });
  }
}
