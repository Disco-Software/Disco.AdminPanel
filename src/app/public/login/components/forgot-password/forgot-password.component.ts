import {Component} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordCodeModalComponent} from '../password-code-modal/password-code-modal.component';
import {state, style, trigger} from '@angular/animations';
import {catchError} from "rxjs/operators";
import {Observable, take, throwError} from "rxjs";
import {ForgotPasswordAction, LoaderState} from "@core/states";
import {ForgotPasswordRequestModel} from "@core/models";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
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
  ]
})
export class ForgotPasswordComponent {
  @Select(LoaderState.isLoadingSelector) loadingState$: Observable<boolean>;

  protected formGroup: FormGroup;

  constructor(
    private _store : Store,
    private _modalService: NgbModal) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  protected onSubmit(): void {
    const req: ForgotPasswordRequestModel = {
      email : this.formGroup.value.email,
    }

    this._store.dispatch(new ForgotPasswordAction(req, navigator.language)).pipe(
      take(1),
      catchError(err => {
        return throwError(() => err);
      })
    ).subscribe((): void => {
      const ref: NgbModalRef = this._modalService.open(PasswordCodeModalComponent, {
        modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
      });
      ref.componentInstance.email = req.email;
    });
  }

  private getFormControl(field: string): AbstractControl {
    return this.formGroup.get(field);
  }

  protected checkIsValid(field: string): boolean {
    return this.getFormControl(field).invalid && (this.getFormControl(field).dirty || this.getFormControl(field).touched);
  }

  protected onEnterSubmit(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }
}
