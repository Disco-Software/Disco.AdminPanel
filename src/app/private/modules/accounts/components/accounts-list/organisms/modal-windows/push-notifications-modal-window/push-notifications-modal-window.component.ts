import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AutoComplete} from "primeng/autocomplete";
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel, LocalStorageService } from '@core';

@Component({
  selector: 'app-push-notifications-modal-window',
  templateUrl: './push-notifications-modal-window.component.html',
  styleUrls: ['./push-notifications-modal-window.component.scss']
})
export class PushNotificationsModalWindowComponent implements OnInit {
  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() email: string;

  notificationsForm: FormGroup;

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _modal: NgbActiveModal, private fb: FormBuilder, private store: Store) {

    const language : LanguageModel = _storageService.getItem('language');

    _translate.use(language.shortCode);

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
