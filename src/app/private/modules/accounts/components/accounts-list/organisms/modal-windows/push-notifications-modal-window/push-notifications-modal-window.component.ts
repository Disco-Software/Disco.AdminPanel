import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AutoComplete} from "primeng/autocomplete";
import { TranslateService } from '@ngx-translate/core';
import { GetSearchedNamesAction, LanguageModel, LocalStorageService } from '@core';
import { Observable, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-push-notifications-modal-window',
  templateUrl: './push-notifications-modal-window.component.html',
  styleUrls: ['./push-notifications-modal-window.component.scss']
})
export class PushNotificationsModalWindowComponent implements OnInit {
  @Select(GetSearchedNamesAction) names$ : Observable<string[]>;

  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() name: string;

  notificationsForm: FormGroup;

  public names : string[];

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  constructor(
    private _storageService : LocalStorageService,
    private _translate : TranslateService,
    private _modal: NgbActiveModal, private fb: FormBuilder, private store: Store) {

    const language : LanguageModel = _storageService.getItem('language');

    _translate.use(language.shortCode);

    this.notificationsForm = this.fb.group({
      name: [''],
      title: [''],
      body: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.selectedItems = [this.name]
    this.names$.pipe(take(1)).subscribe((searchedNames : string[]) => {
      this.names = searchedNames;
    })

    console.log(this.name);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.autocomplete.focusInput(), 0)
  }

  closeModal() {
    this._modal.close();
  }

  disableDeletingFirstElement() {
    if (this.selectedItems.length === 0) {
      this.selectedItems = [this.name]
    }
  }

  search(event: any): void {
    // this.store.dispatch(new SearchAccountsByEmailAction(event.query)).pipe(take(1))
    this.store.dispatch(new GetSearchedNamesAction(event.query)).pipe(take(1));
  }

  sendNotifications() {
    this.notificationsForm.get('body').markAsDirty()
    if (this.notificationsForm.invalid) {
      return
    }
  }

}
