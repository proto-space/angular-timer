import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { Timer } from '../interfaces/timer';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss']
})
export class TimersComponent implements OnInit {

  timers$: Observable<Timer[]>

  constructor(private timerService: TimerService) {
    this.timers$ = timerService.onTimersChanged$.pipe(
      mergeMap(timers$ => {
        return timers$.pipe(
          toArray(),
          map(timerArray => {
            return timerArray.sort((a, b) => {
              return a.endDate.getTime() - b.endDate.getTime();
            })
          })
        )
      })
    );
  }

  ngOnInit(): void {
  }

  onTimerRemove(timer: Timer) {
    this.timerService.removeTimer(timer);
  }

}
