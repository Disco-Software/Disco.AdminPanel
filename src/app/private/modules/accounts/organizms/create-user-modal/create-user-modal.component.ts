import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {CreateAccountInterface} from '../../../../../core/models/account/create-account.interface';
import {SearchType} from 'src/app/core/models/calendar';
import {switchMap, take} from 'rxjs';
import {CreateAccountAction, GetAllAccountsAction} from "../../../../../core/states/accounts-state/account.action";
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  animations: [
    trigger('errorState', [
        state('hide', style({
            opacity: 0,
            display: 'none'
        })),

        state('show', style({
            opacity: 1,
            display: 'block'
        }))
    ])
],
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent {

  public emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  public states : SearchType[] = [
    { name: "Admin", title: "Administrator"},
    { name: "User", title: "User"},
  ];

  public currentState: string = this.states[0].name



  public form : FormGroup = new FormGroup({
    userName : new FormControl('', [Validators.required ]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private _activeModal : NgbActiveModal, private _store : Store) { }

  public onCloseClick() : void{
    this._activeModal.close();
  }

  public onSubmit() : void {
    const req: CreateAccountInterface = {
      roleName: this.currentState,
      userName : this.form.value.userName,
      email : this.form.value.email,
      password : this.form.value.password,
      confirmPassword : this.form.value.confirmPassword
    };

    this._store.dispatch(new CreateAccountAction(req)).pipe(take(1), switchMap(res => {
          return this._store.dispatch(new GetAllAccountsAction({pageNumber: 1, pageSize: 5}))
        }
      )
    ).subscribe(res => {
      this._activeModal.close();
    })
  }

  getFormControl(field): AbstractControl {
    return this.form.get(field)
  }

  checkIsValid(field) {
    return this.getFormControl(field).invalid && (this.getFormControl(field).dirty || this.getFormControl(field).touched)
  }
}
