import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '@core/models';
import { LocalStorageService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
  public currentLanguage: LanguageModel;
  public isShowing: boolean = false;
  public languages: LanguageModel[] = [
    { name: 'language.english', isActive: false, shortCode: 'en' },
    { name: 'language.ukrainian', isActive: false , shortCode: 'ua'},
    { name: 'language.spanish', isActive: false, shortCode: 'sp' },
  ];

  constructor(
    private _lsService: LocalStorageService,
    private _translate: TranslateService) {}

  ngOnInit(): void {
    const item = this._lsService.getItem('language');
    if (!item) {
      this.languages.map((lang) => {
        if (lang.name === 'English') {
          lang.isActive = !lang.isActive;
          this.currentLanguage = lang;
          this._lsService.setItem('language', lang);
        }
        return lang;
      });
    } else {
      this.currentLanguage = item;
    }
    this.languages.map((lang) => {
      if (lang.name === this.currentLanguage.name) {
        lang.isActive = !lang.isActive;
      }
      return lang;
    });
  }

  public switchLanguage(languageModel: LanguageModel) {
    for (let language of this.languages) {
      if (language.isActive) language.isActive = !language.isActive;
    }

    if (languageModel !== this.currentLanguage) {
      this.currentLanguage = languageModel;
      this.currentLanguage.isActive = true;
      this._lsService.setItem('language', languageModel);
    }
    this._translate.use(languageModel.shortCode)
  }

  public toggleDropDownMenu() {
    this.isShowing = !this.isShowing;
  }
}
