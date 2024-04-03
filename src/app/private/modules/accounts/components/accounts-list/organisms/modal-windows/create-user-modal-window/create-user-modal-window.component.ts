import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {CreateAccountInterface, SearchType} from '@core/models';
import {switchMap, take} from 'rxjs';
import {CreateAccountAction, GetAllAccountsAction} from "@core/states";
import {state, style, trigger} from '@angular/animations';

@Component({
  selector: 'app-create-user-modal-window',
  templateUrl: './create-user-modal-window.component.html',
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
  styleUrls: ['./create-user-modal-window.component.scss']
})
export class CreateUserModalWindowComponent {

  protected states: SearchType[] = [
    { name: "Admin", title: "create-user-modal.admin"},
    { name: "User", title: "create-user-modal.user"},
  ];

  protected currentState: string = this.states[0].name;

  protected form: FormGroup = new FormGroup({
    userName : new FormControl('', [Validators.required ]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private _activeModal : NgbActiveModal,
    private _store: Store) {
  }

  protected onSubmit(): void {
    const req: CreateAccountInterface = {
      roleName: this.currentState,
      userName : this.form.value.userName,
      email : this.form.value.email,
      password : this.form.value.password,
      confirmPassword : this.form.value.confirmPassword
    };

    this._store.dispatch(new CreateAccountAction(req)).pipe(take(1), switchMap(() => {
          return this._store.dispatch(new GetAllAccountsAction({pageNumber: 1, pageSize: 5}))
        }
      )
    ).subscribe(() => {
      this._activeModal.close();
    })
  }

  private getFormControl(field: string): AbstractControl {
    return this.form.get(field);
  }

  protected checkIsValid(field: string): boolean {
    return this.getFormControl(field)?.invalid &&
      (this.getFormControl(field)?.dirty || this.getFormControl(field)?.touched);
  }

  protected onEnterSubmit(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }
}
