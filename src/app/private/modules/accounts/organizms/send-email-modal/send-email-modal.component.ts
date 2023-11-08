import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss']
})
export class SendEmailModalComponent {

  emailForm: FormGroup;

  constructor(private _modal: NgbActiveModal, private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      recipient: ['', [Validators.required]],
      title: [''],
      body: ['', [Validators.required]]
    })
  }

  closeModal() {
    this._modal.close();
  }

  sendEmail() {
    console.log(this.emailForm.value)
    //TODO call request in here
  }
}
