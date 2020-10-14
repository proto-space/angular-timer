import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = window.localStorage;

  public set(key: string, value: any): boolean {
    const stringValue = JSON.stringify(value);
    this.storage.setItem(key, stringValue);
    return true;
  }

  public get<T>(key: string, defaultValue?: T): T {
    const value = this.storage.getItem(key);
    if (typeof value === "undefined") {
      return defaultValue;
    }
    return JSON.parse(value);
  }
}
