import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { Timer } from 'src/app/interfaces/timer';
import { TimerService } from "src/app/services/timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() timer: Timer;
  @Output() remove = new EventEmitter<void>();

  timerDuration$:  Observable<number>;


  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    this.timerDuration$ = interval(1000).pipe(
      startWith(0),
      // delay(0),
      map(() => this.timer.endDate.getTime() - Date.now())
    );
  }
}
