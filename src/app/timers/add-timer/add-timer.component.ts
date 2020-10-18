import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Timer } from 'src/app/interfaces/timer';
import { TimerService } from 'src/app/services/timer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-timer',
  templateUrl: './add-timer.component.html',
  styleUrls: ['./add-timer.component.scss']
})
export class AddTimerComponent implements OnInit {
  endDate: Date;
  description: string;

  constructor(
    private timerService: TimerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  add() {
    let timer = {
      description: this.description,
      endDate: this.endDate['_d']
    };
    let now = new Date();
    if (this.endDate['_d'] <= now) {
      this._snackBar.open('timer not accepted', 'ok', {
        duration: 5000,
      });
    }
    else {
      this.timerService.addTimer(timer);
    }

  }

}
