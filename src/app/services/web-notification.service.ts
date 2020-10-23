import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService implements NotificationService {

  constructor() { }

  requestPermission(): Observable<NotificationPermission> {
    const subject = new Subject<NotificationPermission>();
    Notification.requestPermission((permission) => {
      subject.next(permission);
      subject.complete;
    });
    return subject.asObservable();
  }
  
  initialize(): void {
    this.requestPermission().subscribe();
  }
  
  notify(message: string): void {
    if (!("Notification" in window)) {
      return alert(message);
    }
    
    if (Notification.permission === 'denied') {
      this.requestPermission().subscribe(permission => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          this.notify(message);
        }
      })
      return;
    }

    new Notification(message, {
      icon: "assets/icon/timer_64_border.png"
    });
  }
}
