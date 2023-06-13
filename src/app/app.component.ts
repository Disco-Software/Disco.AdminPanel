import { Component } from '@angular/core';
import { LocalStorageService } from '@core/services';
import { LanguageModel } from './core/models/language/language.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public siteLoader : boolean = true;

  constructor(
    private _translateService: TranslateService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.siteLoader = false;
    }, 2000);

    this._translateService.addLangs(['en', 'ua', 'sp']);

    const language = this.localStorageService.getItem("language");

    if(!language){
      const defaultLanguage : LanguageModel = {
         name: 'English',
         isActive: true,
         shortCode: 'en'
      }

      this.localStorageService.setItem("language", defaultLanguage);
    }

    const shortCode : string = this.localStorageService.getItem('language').shortCode;

    this._translateService.setDefaultLang(shortCode);
    this._translateService.use(shortCode);
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
