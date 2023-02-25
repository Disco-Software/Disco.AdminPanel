import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './core/models/account/user.response.model';
import { EventBusService } from './core/services/event-bus.service';
import { LocalStorageService } from './core/services/local-storage.service';

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

  eventBusSub?: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.localStorageService.getString('accessToken');

    if (this.isLoggedIn) {
      const user = this.localStorageService.getItem<User>('user');
      this.role = user.roleName ?? '';

      if (this.role !== 'Admin') {
        console.log("user can't be hare");
      }

      this.username = user.userName;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
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
