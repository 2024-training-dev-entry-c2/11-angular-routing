import { Component, inject} from '@angular/core';
import { NotificationService } from './services/notification.service';
import { CommonModule } from '@angular/common';
import { INotification } from './interface/notification.interface';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {  
  public notification: INotification | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;
    });
  }

  clear(): void {
    this.notificationService.clearNotification();
  }

}
