import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'disco-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent implements OnInit {

  @Input() public title : string;
  @Input() public count : number;
  @Input() public icon : string;
  @Input() public backgroundColor : string;
  @Input() public textColor : string;

  constructor(
    private _translate : TranslateService,
    private _matIconRegistry : MatIconRegistry,
    private _domSanitizer : DomSanitizer) {
      this._matIconRegistry.addSvgIcon('ic_users', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_users.svg'))
      this._matIconRegistry.addSvgIcon('ic_newUsers', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_newUsers.svg'))
      this._matIconRegistry.addSvgIcon('ic_posts', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/ic_posts.svg'))
    }

  ngOnInit(): void {
    this._translate.use('en');
    
  }

}
