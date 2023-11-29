import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModalWindowComponent } from '../modal-windows/create-user-modal-window/create-user-modal-window.component';
import { Store } from '@ngxs/store';
import { GetAllAccountsAction, SearchAccountsAction } from '../../../../../../../core/states/accounts-state/account.action';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel, LocalStorageService } from '@core';

@Component({
  selector: 'app-accounts-header',
  templateUrl: './accounts-header.component.html',
  styleUrls: ['./accounts-header.component.scss']
})
export class AccountsHeaderComponent implements OnInit {
  public search : string;

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _store : Store,
    private _modalService : NgbModal) {
      const leng : LanguageModel = _storageService.getItem("language");

      _translate.use(leng.shortCode);
    }

  ngOnInit(): void {
  }

  public createUser() : void {
    this._modalService.open(CreateUserModalWindowComponent, {
      modalDialogClass: 'd-flex justify-content-center align-items-center',
      centered: true
    });
  }

  public onSearchButtonClick() : void {
    this.getData();
  }

  public onEnterButtonClick(event : KeyboardEvent){
    this.getData();
  }

  private getData() {
    if(!this.search) {
      this._store.dispatch(new GetAllAccountsAction({ pageNumber: 1, pageSize: 5}));
    }
    else {
      this._store.dispatch(new SearchAccountsAction(this.search));
    }
  }
}
