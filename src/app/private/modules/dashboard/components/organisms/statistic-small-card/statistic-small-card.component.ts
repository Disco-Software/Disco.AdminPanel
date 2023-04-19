import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'disco-statistic-small-card',
  templateUrl: './statistic-small-card.component.html',
  styleUrls: ['./statistic-small-card.component.scss']
})
export class StatisticSmallCardComponent implements OnInit {
  @Input() public title : string;
  @Input() public count : number;
  @Input() public backgroundColor : string;
  @Input() public textColor : string;

  constructor(){}

  ngOnInit(): void {
  }

}
