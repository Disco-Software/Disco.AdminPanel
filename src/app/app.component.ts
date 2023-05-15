import { Component } from '@angular/core';
import { LocalStorageService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public siteLoader : boolean = true;

  constructor(
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.siteLoader = false;
    }, 2000);
  }

  logout(): void {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.localStorageService.removeItem('user');

    this.isLoggedIn = false;
    this.role = '';
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
  }
}
