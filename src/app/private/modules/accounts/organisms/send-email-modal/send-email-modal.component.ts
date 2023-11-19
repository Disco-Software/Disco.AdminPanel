import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AutoComplete} from "primeng/autocomplete";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss']
})
export class SendEmailModalComponent implements OnInit, AfterViewInit {
  @ViewChild('autoComplete') autocomplete: AutoComplete
  @Input() email: string;

  emailForm: FormGroup;

  selectedItems: any[] | undefined;

  items: any[] | undefined;

  constructor(private _modal: NgbActiveModal, private fb: FormBuilder, private store: Store) {
    this.emailForm = this.fb.group({
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

  sendEmail() {
    this.emailForm.get('body').markAsDirty()
    if (this.emailForm.invalid) {
      return
    }

    console.log(this.selectedItems)
    console.log(this.emailForm.value)


  }
}
