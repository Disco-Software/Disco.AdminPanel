import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AutoComplete} from "primeng/autocomplete";
import { TranslateService } from '@ngx-translate/core';
import {AccountsState, GetSearchedNamesAction, LanguageModel, LocalStorageService, SendNotificationAction} from '@core';
import { Observable, take, takeUntil } from 'rxjs';
import {Subject} from "rxjs/internal/Subject";
import { NotificationRequestModel } from 'src/app/core/models/notification/notification-request.model';

@Component({
  selector: 'app-push-notifications-modal-window',
  templateUrl: './push-notifications-modal-window.component.html',
  styleUrls: ['./push-notifications-modal-window.component.scss']
})
export class PushNotificationsModalWindowComponent implements OnInit, OnDestroy {
  @Select(AccountsState.getUserNamesSelector) names$ : Observable<string[]>;

  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() name: string;

  notificationsForm: FormGroup;

  public names : string[];

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  onDestroy$: Subject<void> = new Subject();

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
    this.names$.subscribe((searchedNames : string[]) => {
      console.log(searchedNames)
      this.names = searchedNames;
    })
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
    this.store.dispatch(new GetSearchedNamesAction(event.query))
  }

  sendNotifications() {
    const req : NotificationRequestModel = {
      title : this.notificationsForm.value.title,
      body : this.notificationsForm.value.body,
      userNames : this.selectedItems,
      silent : true
    };

    this.store.dispatch(new SendNotificationAction(req)).pipe(take(1), takeUntil(this.onDestroy$)).subscribe(() => {
      this._modal.close();
    })
  }

  public onEnterSubmit(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.sendNotifications()
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
