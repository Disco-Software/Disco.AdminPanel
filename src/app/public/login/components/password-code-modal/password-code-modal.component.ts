import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecoveryPasswordCodeAction } from '@core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { state, style, trigger } from '@angular/animations';
import { CodeInputComponent } from 'angular-code-input';

@Component({
  selector: 'app-password-code-modal',
  templateUrl: './password-code-modal.component.html',
  styleUrls: ['./password-code-modal.component.scss'],
  animations: [
    trigger('errorState', [
      state(
        'hide',
        style({
          opacity: 0,
          display: 'none',
        })
      ),

      state(
        'show',
        style({
          opacity: 1,
          display: 'block',
        })
      ),
    ]),
  ],
})
export class PasswordCodeModalComponent implements OnInit {
  @Input() public email: string;

  public isValidConfirmationCode: boolean;

  public formGroup: FormGroup;

  constructor(private _modal: NgbModal, private _store: Store) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
    });
  }

  public onSubmit() {
    this._store
      .dispatch(
        new RecoveryPasswordCodeAction({
          email: this.email,
          code: this.formGroup.value.code,
        })
      )
      .subscribe((isValid: boolean) => {
        this.isValidConfirmationCode = isValid;
        const ref = this._modal.open(ResetPasswordComponent, {
          modalDialogClass:
            'd-flex justify-content-center align-items-center h-100',
        });
        ref.componentInstance.isValidCode = this.isValidConfirmationCode;
        ref.componentInstance.email = this.email;

        console.log(this.isValidConfirmationCode);
      });
  }

  getFormControl(field): AbstractControl {
    return this.formGroup.get(field);
  }

  checkIsValid(field) {
    return (
      this.getFormControl(field).invalid &&
      (this.getFormControl(field).dirty || this.getFormControl(field).touched)
    );
  }
}
