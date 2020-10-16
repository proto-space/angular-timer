import { Injectable } from '@angular/core';
import { from, Observable, of, Subject,  } from 'rxjs';
import { combineAll, exhaustMap, map, startWith, toArray, mergeMap } from 'rxjs/operators';
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
    this.timersChanged.asObservable().subscribe(this.storeTimer)
  }

  protected storeTimer = () => {
    this.storageService.set(TimerService.TIMER_STORAGE_KEY, Array.from(this.timer));
  }

  public ensureTimer(): Observable<Set<Timer>> {
    if (!this.timer) {
      try {
        this.timer = new Set(this.storageService.get(TimerService.TIMER_STORAGE_KEY));
      } catch(e) {
        this.timer = new Set();
      }
    }

    return of(this.timer);
  }

  public getTimer() {
    return this.timer;
  }

  public getTimer$(): Observable<Timer> {
    return this.ensureTimer().pipe(
      mergeMap(timerSet => {
        return from(Array.from(timerSet));
      })
    );
  }

  public addTimer(timer: Timer): void {
    this.ensureTimer().subscribe(timerSet => {
      timerSet.add(timer);
      this.timersChanged.next();
    });
  }

  public removeTimer(timer: Timer): void {
    this.ensureTimer().subscribe(timerSet => {
      timerSet.delete(timer);
      this.timersChanged.next();
    });
  }

  get onTimersChanged$(): Observable<Observable<Timer>> {
    return this.timersChanged.asObservable().pipe(
      startWith(0),
      map(() => this.getTimer$())
    )
  }

}
