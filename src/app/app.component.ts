import {Component, HostListener} from '@angular/core';
import {LocalStorageService} from '@core/services';
import {TranslateService} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {SetSelectedLanguageAction} from "./core/states/app-config-state/app-config.actions";
import {AppConfigState} from "./core/states/app-config-state/app-config.state";
import {LanguageModel} from "@core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isSmallSizeToaster: boolean;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.isSmallSizeToaster = window.innerWidth <= 430
  }

  @Select(AppConfigState.selectedLanguageSelector) language$: Observable<LanguageModel>
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  public siteLoader : boolean = true;

  constructor(
    private localStorageService: LocalStorageService,    private _translate: TranslateService, private _store: Store
  ) {
    const language : LanguageModel = this.localStorageService.getItem('language');

    _translate.use(language.shortCode);
    // _translate.setDefaultLang('en');
    // _translate.use('en');
  }

  ngOnInit(): void {
    this.getScreenSize();
    setTimeout(() => {
      this.siteLoader = false;
    }, 2000);
  }

  logout(): void {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.localStorageService.removeItem('user');

    this.isLoggedIn = false;
    this.role = '';
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
  }
}
