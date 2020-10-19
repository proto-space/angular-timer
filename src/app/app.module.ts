import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { TimersComponent } from './timers/timers.component';
import { TimerComponent } from './timers/timer/timer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatetimePipe } from './pipes/datetime.pipe';
import { DisplayTimeLeftPipe } from './pipes/display-time-left.pipe';
import { AddTimerComponent } from './timers/add-timer/add-timer.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddTimerComponent,
    AppComponent,
    ClockComponent,
    TimersComponent,
    TimerComponent,
    DatetimePipe,
    DisplayTimeLeftPipe
  ],
  imports: [
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
