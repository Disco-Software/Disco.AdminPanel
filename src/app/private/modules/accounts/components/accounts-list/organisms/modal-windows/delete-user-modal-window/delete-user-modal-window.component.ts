import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {GetAllAccountsAction, RemoveAccountAction} from '@core/states';
import {switchMap} from "rxjs";
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from "@core/services";
import {LanguageModel} from "@core/models";

@Component({
  selector: 'app-delete-user-modal-window',
  templateUrl: './delete-user-modal-window.component.html',
  styleUrls: ['./delete-user-modal-window.component.scss']
})
export class DeleteUserModalWindowComponent implements OnInit {

  @Input() public id : number;

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _modal : NgbActiveModal,
    private _store : Store) {
      const language : LanguageModel = _storageService.getItem('language');

      _translate.use(language.shortCode);
    }

  ngOnInit(): void {
  }

  closeModal(){
    this._modal.close();
  }

  public deleteUser() : void {
    this._store.dispatch(new RemoveAccountAction(this.id)).pipe(
      switchMap(res=> this._store.dispatch(new GetAllAccountsAction({ pageNumber: 1, pageSize: 5})))
    )
      .subscribe(x => {
        this._modal.close()
      });
  }


}
