import { Injectable } from '@angular/core';
import { from, Observable, of, Subject, timer as timeout } from 'rxjs';
import { filter, map, mergeMap, startWith, toArray } from 'rxjs/operators';
import { Timer } from '../interfaces/timer';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private static readonly TIMER_STORAGE_KEY = "TIMER_STORAGE_KEY";

  private timer: Set<Timer>;

  private timersChanged = new Subject<void>();

  public constructor(private storageService: StorageService, private notificationService: NotificationService) {
    this.timersChanged.asObservable().subscribe(this.storeTimer)
  }

  protected storeTimer = () => {
    this.storageService.set(TimerService.TIMER_STORAGE_KEY, Array.from(this.timer).map(timer => {
      let {subscription, ...timerRaw} = timer;
      return timerRaw;
    }));
  }

  public ensureTimer(): Observable<Set<Timer>> {
    if (!this.timer) {
      return this.loadTimer();
    }
    return of(this.timer);
  }

  public loadTimer(): Observable<Set<Timer>> {
    try {
      const now = Date.now();
      const timers = this.storageService.get(TimerService.TIMER_STORAGE_KEY) as Timer[];

      return from(timers || []).pipe(
        map(timer => {
          timer.endDate = new Date(timer.endDate);
          return timer;
        }),
        filter(timer => {
          return timer.endDate.getTime() > now;
        }),
        map(timer => {
          this.addTimeout(timer);
          return timer;
        }),
        toArray(),
        map((timers) => {
          this.timer = new Set(timers);
          return this.timer;
        })
      )
    } catch(e) {
      this.timer = new Set();
    }

    return of(this.timer);
  }

  public getTimer(): Set<Timer> {
    return this.timer;
  }

  protected fireTimer(timer: Timer): void  {
    this.notificationService.notify(timer.description);
  }

  protected addTimeout(timer: Timer): void {
    if (timer.subscription) {
      return;
    }

    const difference = timer.endDate.getTime() - Date.now();
    timer.subscription = timeout(difference).subscribe(() => {
      this.removeTimer(timer);
      this.fireTimer(timer);
    });
  }

  protected clearTimeout(timer: Timer): void {
    if (!timer.subscription) {
      return;
    }

    timer.subscription.unsubscribe();
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
      this.addTimeout(timer);
      timerSet.add(timer);
      this.timersChanged.next();
    });
  }

  public removeTimer(timer: Timer): void {
    this.ensureTimer().subscribe(timerSet => {
      this.clearTimeout(timer);
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
