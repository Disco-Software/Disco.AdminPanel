import {Component, Input, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, takeUntil} from 'rxjs';
import {Account} from '../../../../../../../../core/models/account/account.model';
import {ReportModel} from '../../../../../../../../core/models/report/report.model';
import {RoleModel} from '../../../../../../../../core/models/role/role.model';
import {AccountAction, EditAccountEmailAction} from '../../../../../../../../core/states/accounts-state/account.action';
import {AccountsState} from '../../../../../../../../core/states/accounts-state/account.state';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel, LocalStorageService } from '@core';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent implements OnInit {

  @Select(AccountsState.getAccountSelector) public account$ : Observable<Account>;

  @Input() public id : number;
  @Input() public role : string;

  public account : Account;

  public reports : ReportModel[] = [];

  public currentRole : RoleModel;

  public roles : RoleModel[] = [
    {key: 'Admin', value: 'user-modal.roles.admin'},
    {key: 'User', value: 'user-modal.roles.user'}
  ];

  public destory$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _store: Store,
    public activeModal: NgbActiveModal) {
      const lang : LanguageModel = _storageService.getItem("language");

      for (let role of this.roles) {
        _translate.get(role.value);
      }

      _translate.use(lang.shortCode);
  }

  ngOnInit(): void {
    this._store.dispatch(new AccountAction(this.id));
    this.account$.pipe(takeUntil(this.destory$)).subscribe((res:Account) => {
      this.account = res;
    });

    this.currentRole = this.roles.find(role=>role.key === this.role)

  }

  onRoleChange(event: Event) {
    console.log('event')
  }

  public sliceString(str : string){
    return str.slice(0, 19);
  }

}
