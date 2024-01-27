import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, take, takeUntil} from 'rxjs';
import {Account} from '../../../../../../../../core/models/account/account.model';
import {ReportModel} from '../../../../../../../../core/models/report/report.model';
import {RoleModel} from '../../../../../../../../core/models/role/role.model';
import {AccountAction, AccountsState, EditAccountRoleAction} from '@core/states';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCropperModalWindowComponent} from "../image-cropper-modal-window/image-cropper-modal-window.component";
import {ChangeRoleRequestModel} from '../../../../../../../../core/models/account/change-role-request.model';

@Component({
  selector: 'app-user-modal-window',
  templateUrl: './user-modal-window.component.html',
  styleUrls: ['./user-modal-window.component.scss']
})
export class UserModalWindowComponent implements OnInit {
  @Select(AccountsState.getAccountSelector) public account$ : Observable<Account>;
  @Output() updatedItemData = new EventEmitter()

  @Input() public id : number;

  public account : Account;

  public reports : ReportModel[] = [];

  public currentRole : RoleModel;

  public roles : RoleModel[] = [
    {key: 'Admin', value: 'user-modal.roles.admin'},
    {key: 'User', value: 'user-modal.roles.user'}
  ];

  public destory$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store,
    private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this._store.dispatch(new AccountAction(this.id));
    this.account$.pipe(takeUntil(this.destory$)).subscribe((res:Account) => {
      this.account = res;
      this.currentRole = this.roles.find(role=>role.key === this.account?.user.roleName)
    });
  }

  onFileChange(event: any) {
    const ref = this._modalService.open(ImageCropperModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });

    ref.componentInstance.imageChangedEvent = event;
    ref.componentInstance.isAccountPhoto = !!this.account.photo;
    ref.componentInstance.id = this.account.user.id;
    ref.componentInstance.updatedPhoto.pipe(take(1)).subscribe(res=>{
      this.account = {
        ...this.account,
        photo: res
      }
      this.updatedItemData.emit()
    })

  }


  onRoleChange(event: Event) {
    const req : ChangeRoleRequestModel = {
      id : this.id,
      roleName : this.currentRole.key,
    };

    this._store.dispatch(new EditAccountRoleAction(req));
  }


  public onDeleteUserPhoto() {
    console.log('delete user')
  }

}
