import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { combineAll, exhaustMap, map, startWith, toArray } from 'rxjs/operators';
import { Timer } from '../interfaces/timer';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private static readonly TIMER_STORAGE_KEY = "TIMER_STORAGE_KEY";

  private timer: Set<Timer>;

  private timersChanged = new Subject<void>();

  public constructor(private storageService: StorageService) {
    this.timersChanged.asObservable().pipe( toArray() ).subscribe(this.storeTimers)
  }

  public storeTimers(timer: Timer[]): void {

  }

  public ensureTimers(): Observable<void> {
    if (this.timer === null) {
      this.timer = new Set(this.storageService.get(TimerService.TIMER_STORAGE_KEY));
    }
  }

  public storeTimers() {

  }

  public getTimers(): Observable<Timer> {
    
    return from(this.timer);
  }

  public addTimer(timer: Timer): void {
    this.timer.add(timer);
    this.timersChanged.next();
  }

  public removeTimer(timer: Timer): void {
    this.timer.delete(timer);
    this.timersChanged.next();
  }

  get onTimersChanged$(): Observable<Observable<Timer>> {
    return this.timersChanged.asObservable().pipe(
      startWith(),
      map(() => this.getTimers())
    )
  }

}
