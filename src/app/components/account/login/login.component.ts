import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { LogInRequestModel } from '../../../models/account/login.request.model';
import { UserResponseModel } from '../../../models/account/user.response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public requestModel: LogInRequestModel = {
    email: "",
    password: "",
  }

  public disabled: boolean = false;
  public userResponseDto: UserResponseModel = {}

  constructor(
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(`email: ${this.requestModel.email}`);
    console.log(`password: ${this.requestModel.password}`);
  }

  public async onSubmit() {

    this.accountService.loginAsync(this.requestModel)
      .subscribe(value => this.userResponseDto = value, error => {
        console.log(error);
      });

    console.log(this.userResponseDto);

    localStorage.setItem("accessToken", this.userResponseDto.accessToken ?? '');
    localStorage.setItem("refreshToken", this.userResponseDto.refreshToken ?? '');

    debugger;

    this.router.navigate(['']);
  }

}
