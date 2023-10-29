import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {CreateAccountInterface} from '../../../../../core/models/account/create-account.interface';
import {SearchType} from 'src/app/core/models/calendar';
import {switchMap, take} from 'rxjs';
import {CreateAccountAction, GetAllAccountsAction} from "../../../../../core/states/accounts-state/account.action";

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent {

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
}
