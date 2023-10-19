import { Component } from '@angular/core';
import { LanguageModel, LocalStorageService } from '@core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private _translateService : TranslateService,
              private _storageService : LocalStorageService) {
      const language : LanguageModel = this._storageService.getItem('language');

      this._translateService.use(language.shortCode);
  }

}
