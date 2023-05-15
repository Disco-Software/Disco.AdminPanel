import { Component, OnInit } from '@angular/core';
import { LanguageModel } from 'src/app/core/models';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent implements OnInit {

  public currentLanguage : LanguageModel;
  public isShowing : boolean = true;
  public languages: LanguageModel[] = [
    {name: 'English', isActive: true},
    {name: 'Ukranian', isActive: false},
    {name: 'Spanish', isActive: false}
  ];


  constructor() { }

  ngOnInit(): void {
    console.log(this.currentLanguage.name)
  }

  public switchLanguage(languageModel: LanguageModel){
    for(let language of this.languages){
      if(language.isActive)
        language.isActive = !language.isActive;
    }

    if(languageModel !== this.currentLanguage){
      this.currentLanguage = languageModel;
      this.currentLanguage.isActive = true;

      console.log(this.currentLanguage);
    }

    console.log(this.currentLanguage.name);
  }

  public toggleDropDownMenu() {
    this.isShowing = !this.isShowing;

    console.log(this.isShowing);
  }

}
