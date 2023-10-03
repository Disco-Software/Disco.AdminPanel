import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PageService } from '@core/services';
import {GraphSettings, LanguageModel, StatisticModel} from '@core/models';
import { Select, Store } from '@ngxs/store';
import { StatisticsState } from '@core';
import { StatisticsModel } from '../../../../../core/models/statistics/statistics.model';
import { Observable, takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {AppConfigState} from "../../../../../core/states/app-config-state/app-config.state";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(AppConfigState.selectedLanguageSelector) language$: Observable<LanguageModel>

  public title : String;

  @Select(StatisticsState.getStatistics)
  public statisticsModel$ : Observable<StatisticsModel>;

  public statisticCards : StatisticModel[] = []

  public sub : Subject<boolean> = new Subject();

  public usersTitle = 'graphs.users';
  public newUsersTitle = 'graphs.newUsers';
  public postsTitle = 'graphs.posts';

  public usersGraphSetting: GraphSettings = {
    title: '',
    data: [],
    color: [
      'rgba(52, 129, 205, 1)',
      'rgba(52, 129, 205, 0)'
    ],
    hoverColor: ['rgba(194, 125, 41, 1)', 'rgba(52, 129, 205, 0)']
  }

  public newUsersGraphSettings: GraphSettings = {
    title: 'New Users',
    data: [],
    color: [
      'rgba(129, 32, 226, 1)',
      'rgba(120, 74, 180, 0)',

    ],
    hoverColor: ['rgba(194, 125, 41, 1)', 'rgba(129, 32, 226, 0)']
  }

  public postsGraphSettings: GraphSettings =
  {
    title: 'Posts',
    data: [],
    color: [
      'rgba(25, 163, 163, 1)',
      'rgba(44, 203, 203, 0)'
    ],
    hoverColor: ['rgba(194, 125, 41, 1)', 'rgba(44, 203, 203, 0)']
  }

  constructor(private _pageService: PageService, private _store : Store, private _translate: TranslateService
  ) {
    this.language$.subscribe(res=>{
      this._translate.use(res.shortCode);
    });
  }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName : 'Overview',
      pageIcon : 'overview',
    });

    this.statisticsModel$.pipe(takeUntil(this.sub))
    .subscribe((x : StatisticsModel) => {
      this.statisticCards = [
      { title: 'statisticsCard.users', count: x?.usersCount, icon: 'ic_users', backgroundColor: '#3481CD', textColor: '#F3FEFF' },
      { title: 'statisticsCard.newUsers', count: x?.newUsersCount, icon: 'ic_newUsers', backgroundColor: '#5D2AC0', textColor: '#F3FEFF' },
      { title: 'statisticsCard.posts', count: x?.postsCount, icon: 'ic_posts', backgroundColor: '#2CCBCB', textColor: '#F3FEFF' }]

      this.usersGraphSetting = {
        ...this.usersGraphSetting,
        data: x?.aggregatedUsers,
      };
      this.newUsersGraphSettings = {
        ...this.newUsersGraphSettings,
        data: x?.aggregatedNewUsers
      };
      this.postsGraphSettings = {
        ...this.postsGraphSettings,
        data: x?.aggregatedPosts
      }
    });

  }

  ngOnDestroy(): void {
    this.sub.next(true);
    this.sub.complete();
  }
}
