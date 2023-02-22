import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from './services/account.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { AccountModule } from './components/account/account.module';
import { DashbordModule } from './components/dashbord/dashbord.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AccountModule,
    DashbordModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
