import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderState, RecoveryPasswordAction} from '@core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {
  AccountPasswordResetPasswordRequestModel
} from 'src/app/core/models/account-password/account-password-reset-request.model';
import {Observable} from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @Select(LoaderState.isLoadingSelector) loadingState$: Observable<boolean>;

  @Input() public email : string;
  @Input() public isValidCode : boolean;

  public formGroup : FormGroup;

  constructor(
    private _modalActive: NgbActiveModal,
    private _store : Store) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.minLength(6)])
    });
  }


  public recoverPassword() {
    const req : AccountPasswordResetPasswordRequestModel = {
      email: this.email,
      password : this.formGroup.value.password,
      confirmPassword: this.formGroup.value.confirmPassword,
      isValidPasswordRecoveryCode : true,
    };

    this._store.dispatch(new RecoveryPasswordAction(req)).subscribe((x : boolean) => {
      location.reload();
    })
  }

  isDisabledButton(): boolean {
    return !((this.formGroup.get('password').value.length > 0 &&
        this.formGroup.get('confirmPassword').value.length > 0) &&
      (this.formGroup.get('password').value === this.formGroup.get('confirmPassword').value))
  }
}
