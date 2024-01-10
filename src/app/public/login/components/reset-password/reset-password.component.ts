import {Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LoaderState, RecoveryPasswordAction} from '@core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import { AccountPasswordResetPasswordRequestModel } from 'src/app/core/models/account-password/account-password-reset-request.model';
import { PasswordCodeModalComponent } from '../password-code-modal/password-code-modal.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
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
      isValidPasswordRecoveryCode : this.isValidCode,
    };

    this._store.dispatch(new RecoveryPasswordAction(req)).subscribe((x : boolean) => {
      this._modalActive.close(this);
    })
  }
}
