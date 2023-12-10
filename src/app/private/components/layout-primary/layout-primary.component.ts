import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {LoaderState} from '@core/states';
import {Observable, Subject, takeUntil} from 'rxjs';
import {AppConfigState, LanguageModel} from "@core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-layout-primary',
  templateUrl: './layout-primary.component.html',
  styleUrls: ['./layout-primary.component.scss']
})
export class LayoutPrimaryComponent implements OnInit {
  test(e: any) {
    console.log(e)
  }
  isCollapsedBurgerMenu: boolean;
  @Select(AppConfigState.selectedLanguageSelector) language$: Observable<LanguageModel>

  @Select(LoaderState.getListSelector) selectorsList$: Observable<string[]>

  destroy$: Subject<boolean> = new Subject<boolean>();

  isLoader: boolean = false;

  constructor(
    private _translate: TranslateService

  ) {
  }

  ngOnInit(): void {
    this.language$.subscribe(res=>{
      this._translate.use(res.shortCode)
    })

    this.selectorsList$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      setTimeout(() => {
        this.isLoader = !!res.length
      })
    })
  }

}
