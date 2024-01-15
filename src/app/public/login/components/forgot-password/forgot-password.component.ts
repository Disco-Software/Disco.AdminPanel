import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {ForgotPasswordAction, ForgotPasswordRequestModel, LoaderState} from '@core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordCodeModalComponent} from '../password-code-modal/password-code-modal.component';
import {TranslateService} from '@ngx-translate/core';
import {state, style, trigger} from '@angular/animations';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

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

  public email : string;

  public formGroup : FormGroup;

  constructor(
    private _translate : TranslateService,
    private _store : Store,
    private _modalService: NgbModal) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public onSubmit(){
    const req : ForgotPasswordRequestModel = {
      email : this.formGroup.value.email,
    }

    this._store.dispatch(new ForgotPasswordAction(req, navigator.language)).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(() => {
      const ref = this._modalService.open(PasswordCodeModalComponent, {
        modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
      });
      ref.componentInstance.email = req.email;
    });
  }

  getFormControl(field): AbstractControl {
    return this.formGroup.get(field)
  }

  checkIsValid(field) {
    // console.log(this.getFormControl(field).errors)
    return this.getFormControl(field).invalid && (this.getFormControl(field).dirty || this.getFormControl(field).touched)
  }
}
