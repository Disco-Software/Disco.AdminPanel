import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { RemoveAccountAction } from 'src/app/core/states/accounts-state/remove.action';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() public id : number;

  constructor(private _modal : NgbActiveModal, private _store : Store) { }

  ngOnInit(): void {
  }

  closeModal(){
    this._modal.close();
  }

  public deleteUser() : void {
    this._store.dispatch(new RemoveAccountAction(this.id))
      .subscribe(x => this._modal.close());
  }


}
