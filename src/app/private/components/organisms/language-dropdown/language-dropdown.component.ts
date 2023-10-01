import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '@core/models';
import { LocalStorageService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import {SetSelectedLanguageAction} from "../../../../core/states/app-config-state/app-config.actions";
import {Store} from "@ngxs/store";
import {AppConfigState} from "../../../../core/states/app-config-state/app-config.state";

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
    private _translate: TranslateService,
    private _store: Store
    ) {}

  ngOnInit(): void {
    this.currentLanguage =  this._store.selectSnapshot(AppConfigState.selectedLanguageSelector)
    this.setActiveLanguage()
  }

  setActiveLanguage() {
    this.languages.map((lang) => {
      if (lang.name === this.currentLanguage.name) {
        lang.isActive = true;
      }
      return lang;
    });
  }

  public switchLanguage(languageModel: LanguageModel) {
    this.languages = this.languages.map((lang) => {
      return { ...lang, isActive: false };
    });

    this.currentLanguage = languageModel;
    this.setActiveLanguage();
    this._store.dispatch(new SetSelectedLanguageAction(this.currentLanguage));
  }

  public toggleDropDownMenu() {
    this.isShowing = !this.isShowing;
  }
}
