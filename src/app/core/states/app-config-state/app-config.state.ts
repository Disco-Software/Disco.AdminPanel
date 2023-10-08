import {Action, NgxsOnInit, Selector, State, StateContext,} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AppConfigStateInterface, LanguageModel} from "@core/models";
import {SetSelectedLanguageAction} from "./app-config.actions";
import {LocalStorageService} from "@core";
import {TranslateService} from "@ngx-translate/core";

@State<AppConfigStateInterface>({
  name: "AppConfigState",
  defaults: {
    selectedLanguage: null
  }
})
@Injectable()
export class AppConfigState implements NgxsOnInit {

  constructor(private _lsService: LocalStorageService, private _translateService: TranslateService) {
  }

  ngxsOnInit(ctx: StateContext<AppConfigStateInterface>) {
    this._translateService.addLangs(['en', 'ua', 'sp']);
    let language: LanguageModel = this._lsService.getItem("language");

    if (!language) {
      language = {
        name: 'English',
        isActive: true,
        shortCode: 'en'
      }
    }

    ctx.dispatch(new SetSelectedLanguageAction(language));
  }

  @Action(SetSelectedLanguageAction)
  setSelectedLanguage({patchState}: StateContext<AppConfigStateInterface>, {selectedLanguage}: SetSelectedLanguageAction) {
    patchState({selectedLanguage})
    this._lsService.setItem('language', selectedLanguage);
  }

  @Selector()
  static selectedLanguageSelector(state: AppConfigStateInterface): LanguageModel {
    return state.selectedLanguage;
  }
}
