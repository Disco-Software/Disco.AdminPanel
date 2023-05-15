import { Component, OnInit } from '@angular/core';
import { LanguageModel } from 'src/app/core/models';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
  public currentLanguage: LanguageModel;
  public isShowing: boolean = false;
  public languages: LanguageModel[] = [
    { name: 'English', isActive: false },
    { name: 'Ukranian', isActive: false },
    { name: 'Spanish', isActive: false },
  ];

  constructor(private _lsService: LocalStorageService) {}

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
  }

  public toggleDropDownMenu() {
    this.isShowing = !this.isShowing;

    console.log(this.isShowing);
  }
}
