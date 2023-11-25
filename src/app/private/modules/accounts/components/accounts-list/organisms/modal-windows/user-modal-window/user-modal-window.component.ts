import {Component, Input, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, takeUntil} from 'rxjs';
import {Account} from '../../../../../../../../core/models/account/account.model';
import {ReportModel} from '../../../../../../../../core/models/report/report.model';
import {RoleModel} from '../../../../../../../../core/models/role/role.model';
import {AccountAction} from '../../../../../../../../core/states/accounts-state/account.action';
import {AccountsState} from '../../../../../../../../core/states/accounts-state/account.state';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent implements OnInit {

  @Select(AccountsState.getAccountSelector) public account$ : Observable<Account>;

  @Input() public id : number;

  public account : Account;

  public reports : ReportModel[] = [];

  public currentRole : RoleModel;
  public roles : RoleModel[] = [
    {key: 'Admin', value: 'Administrator'},
    {key: 'User', value: 'User'}
  ];

  public destory$ : Subject<boolean> = new Subject<boolean>();

  constructor(private _store: Store, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this._store.dispatch(new AccountAction(this.id));
    this.account$.pipe(takeUntil(this.destory$)).subscribe(res => {
      this.account = res;
    });

    const role = this.roles.find(x => x.key === this.account?.user.roleName);

    this.currentRole = role;
  }

  public sliceString(str : string){
    return str.slice(0, 19);
  }

}
