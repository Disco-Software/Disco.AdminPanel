import {LanguageModel} from "@core";

export class SetSelectedLanguageAction {
  static readonly type = '[App Config] Set Selected Language';

  constructor(public selectedLanguage: LanguageModel) {
  }
}
