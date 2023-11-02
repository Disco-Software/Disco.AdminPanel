import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Account } from 'src/app/core/models/account/account.model';
import { ReportModel } from 'src/app/core/models/report/report.model';
import { RoleModel } from 'src/app/core/models/role/role.model';
import { AccountAction } from 'src/app/core/states/accounts-state/account.action';
import { AccountsState } from 'src/app/core/states/accounts-state/account.state';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {

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

  constructor(private _store : Store) { }

  ngOnInit(): void {
    console.log(this.id);
    this._store.dispatch(new AccountAction(this.id));
    this.account$.pipe(takeUntil(this.destory$)).subscribe(res => {
      this.account = res;
    });

    const role = this.roles.find(x => x.key === this.account.user.roleName);

    this.currentRole = role;
  }

  public sliceString(str : string){
    return str.slice(0, 19);
  }

}
