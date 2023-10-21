import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ResetPasswordComponent } from '../reset-password/reset-password.component'
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel, LocalStorageService } from '@core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(
    private _modalService: NgbModal,
    private _storageService: LocalStorageService,
    private _translate: TranslateService) {
      const language : LanguageModel = this._storageService.getItem('language');

      _translate.use(language.shortCode);
    }

  public onSubmit(){
    this._modalService.open(ResetPasswordComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center h-100'
    })
  }

}
