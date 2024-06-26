import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {Observable, take, throwError} from 'rxjs';
import {state, style, trigger} from '@angular/animations';
import {catchError} from "rxjs/operators";
import {LoaderState, RecoveryPasswordCodeAction} from "@core/states";

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
  @Select(LoaderState.isLoadingSelector) loadingState$: Observable<boolean>;

  @Input() public email: string;

  public isValidConfirmationCode: boolean;

  public code : number;

  constructor(private _modal: NgbModal, private _store: Store) {}

  ngOnInit(): void {
  }

  public onSubmit() {
    this._store
      .dispatch(
        new RecoveryPasswordCodeAction({
          email: this.email,
          code: this.code,
        })
      )
      .pipe(
        take(1),
        catchError(err=>{
          return throwError(err);
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
      });
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.code = +code
  }

// this called only if user entered full code
  onCodeCompleted(code: string) {
  }

  public onEnterSubmit(e: KeyboardEvent): void {
    console.log('here')
    if (e.key === 'Enter') {
      this.onSubmit()
    }
  }
}
