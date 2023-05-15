import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ResetPasswordComponent } from '../reset-password/reset-password.component'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private _modalService: NgbModal) { }

  public onSubmit(){
    this._modalService.open(ResetPasswordComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    })
  }

}
