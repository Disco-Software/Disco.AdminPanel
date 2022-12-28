import { IUserResonseModel } from './../../../models/user.response.model';
import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { LogInRequestModel } from 'src/app/models/login.request.model';
import { UserResponseModel } from '../../../models/user.response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() public email : String = "";
  @Input() public password : String = "";

  constructor(private accountService : AccountService) { }

   ngOnInit(): void {
     let model : LogInRequestModel = {
       email: this.email,
       password : this.password
     };

     let response = this.accountService.loginAsync(model)
       .then(response => response.)

     console.log(response);
  }

}
