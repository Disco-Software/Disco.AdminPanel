import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `<button class="bg-transparent border-0">
  <img [src]="'/assets/images/ic_notifications.svg'">
</button>
`
})
export class NotificationComponent {}
