import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AutoComplete} from "primeng/autocomplete";

@Component({
  selector: 'app-push-notifications-modal',
  templateUrl: './push-notifications-modal.component.html',
  styleUrls: ['./push-notifications-modal.component.scss']
})
export class PushNotificationsModalComponent implements OnInit {
  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() email: string;

  notificationsForm: FormGroup;

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  constructor(private _modal: NgbActiveModal, private fb: FormBuilder, private store: Store) {
    this.notificationsForm = this.fb.group({
      recipient: [''],
      title: [''],
      body: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.selectedItems = [this.email]
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.autocomplete.focusInput(), 0)
  }

  closeModal() {
    this._modal.close();
  }

  disableDeletingFirstElement() {
    if (this.selectedItems.length === 0) {
      this.selectedItems = [this.email]
    }
  }

  search(event: any): void {
    // this.store.dispatch(new SearchAccountsByEmailAction(event.query)).pipe(take(1))
    this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }

  sendNotifications() {
    this.notificationsForm.get('body').markAsDirty()
    if (this.notificationsForm.invalid) {
      return
    }
  }

}
