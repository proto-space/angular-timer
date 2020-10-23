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
  endDate: Date = new Date();
  description: string;

  constructor(
    private timerService: TimerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.clear();
  }

  add() {
    let timer = {
      description: this.description,
      endDate: this.endDate
    };

    if (this.endDate.getTime() <= Date.now()) {
      return this._snackBar.open('Timer not accepted', 'ok', {
        duration: 5000,
      });
    }
    

    this.timerService.addTimer(timer);
    this.clear();
  }

  onDateChange(event) {
    const date: Date = event.value;
    this.endDate.setFullYear(date.getFullYear());
    this.endDate.setMonth(date.getMonth());
    this.endDate.setDate(date.getDate());
  }

  onTimeChange(event) {
    const value = event.target.value;
    const [hours, minutes] = value.split(":");

    this.endDate.setHours(hours);
    this.endDate.setMinutes(minutes);
  }

  clear() {
    this.endDate = new Date();
    this.endDate.setHours(this.endDate.getHours() + 1);
    this.endDate.setSeconds(0);
    this.description = "";
  }
}
