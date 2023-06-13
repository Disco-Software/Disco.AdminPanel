import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageModel } from '@core/models';
import { LocalStorageService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-languale-full-dropdown',
  templateUrl: './languale-full-dropdown.component.html',
  styleUrls: ['./languale-full-dropdown.component.scss'],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          transform: "rotate(0)",
        })
      ),
      state(
        "closed",
        style({
          transform: "rotate(-90deg)",
        })
      ),
      transition("open => closed", [animate("0.5s")]),
      transition("closed => open", [animate("0.5s")]),
    ]),
  ],
})
export class LangualeFullDropdownComponent implements OnInit {
  public currentLanguage: LanguageModel;
  public isShowing: boolean;
  public languages: LanguageModel[] = [
    { name: 'English', isActive: false, shortCode: 'en' },
    { name: 'Ukranian', isActive: false, shortCode: 'ua' },
    { name: 'Spanish', isActive: false, shortCode: 'sp' },
  ];

  constructor(private _lsService: LocalStorageService, private cdr: ChangeDetectorRef, protected _domSanitizer : DomSanitizer, protected _matIconRegistry : MatIconRegistry, private _translate: TranslateService) {
    this._matIconRegistry.addSvgIcon('language', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_language.svg'))
  }

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
    const shortCode : string = this._lsService.getItem('language').shortCode;

    this._translate.use(shortCode);
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
