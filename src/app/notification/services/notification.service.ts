import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotification } from '../interface/notification.interface';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<INotification | null>(null);
  public notification$: Observable<INotification | null> = this.notificationSubject.asObservable();

  setNotification(type: 'success' | 'error', message: string): void {
    this.notificationSubject.next({ type, message });
  }

  clearNotification(): void {
    this.notificationSubject.next(null); 
  }
}