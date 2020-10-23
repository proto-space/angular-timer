import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class NotificationService {

  constructor() { }

  abstract initialize(): void;

  abstract notify(message: string): void;
}
