import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../core/services/page.service';
import { PageModel } from '../../../../core/models/page/page.model';
import { LanguageModel } from '../../../../core/models/language/language.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public pageModel : PageModel;
  public currentLanguage : LanguageModel;
  public isShowing : boolean = false;
  public languages: LanguageModel[] = [
    {name: 'English', isActive: true},
    {name: 'Ukranian', isActive: false},
    {name: 'Spanish', isActive: false}
  ];

  constructor(protected _pageService : PageService) { }

  ngOnInit(): void {
    this._pageService.getTitle().subscribe(pageModel => this.pageModel = pageModel);
  }

  public switchLanguage(languageModel: LanguageModel){
    for(let language of this.languages){
      if(language.isActive)
        language.isActive = !language.isActive;
    }

    if(languageModel != this.currentLanguage){
      this.currentLanguage = languageModel;
      this.currentLanguage.isActive = true;

      console.log(this.currentLanguage);
    }
  }

}
