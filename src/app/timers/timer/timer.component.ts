import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { Timer } from 'src/app/interfaces/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() timer: Timer;

  timerDuration$:  Observable<number>;

  constructor() { }

  ngOnInit(): void {
    this.timerDuration$ = interval(1000).pipe(
      startWith(0),
      // delay(0),
      map(() => this.timer.endDate.getTime() - Date.now())
    );
  }

}
