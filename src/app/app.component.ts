import {Component, HostListener, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {AppConfigState} from "@core/states";
import {LanguageModel} from "@core/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  protected getScreenSize(): void {
    this.isSmallSizeToaster = window.innerWidth <= 430;
  }

  @Select(AppConfigState.selectedLanguageSelector) language$: Observable<LanguageModel>;

  protected isSmallSizeToaster: boolean = false;

  protected siteLoader: boolean = true;

  public ngOnInit(): void {
    this.getScreenSize();
    setTimeout((): void => {
      this.siteLoader = false;
    }, 2000);
  }
}
