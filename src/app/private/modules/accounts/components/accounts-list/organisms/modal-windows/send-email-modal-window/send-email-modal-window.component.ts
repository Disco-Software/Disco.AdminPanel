import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutoComplete} from "primeng/autocomplete";
import {Select, Store} from "@ngxs/store";
import {AccountsState, GetSelectedEmailsAction, SendingEmailAction} from '@core';
import {Observable, Subject, take, takeUntil} from 'rxjs';
import {EmailSendingRequestModel} from "../../../../../../../../core/models/email/email-sending-request.model";

@Component({
  selector: 'app-send-email-modal-window',
  templateUrl: './send-email-modal-window.component.html',
  styleUrls: ['./send-email-modal-window.component.scss']
})
export class SendEmailModalWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(AccountsState.getSelectedEmailsSelector) public emails$ : Observable<string[]>

  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() email: string;

  emailForm: FormGroup;

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _modal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store) {

      this.emailForm = this.fb.group({
      recipient: [''],
      title: [''],
      body: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.selectedItems = [this.email]
    this.emails$.pipe(takeUntil(this.destroy$)).subscribe((result : string[]) => {
      this.items = result.map((item) => item);
    })
  }

  ngAfterViewInit(): void {
    // setTimeout(() => this.autocomplete.focusInput(), 0)
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
     this.store.dispatch(new GetSelectedEmailsAction(event.query)).pipe(take(1));
  }

  sendEmail() {
    const req : EmailSendingRequestModel = {
      toEmails : ['s.d.korchevskyi@gmail.com'],
      title : this.emailForm.value.title,
      body : this.emailForm.value.body,
      isHtml : true,
      name : '',
    };

    this.store.dispatch(new SendingEmailAction(req));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
