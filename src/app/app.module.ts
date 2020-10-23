import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { MaterialModule } from './material.module';
import { DatetimePipe } from './pipes/datetime.pipe';
import { DisplayTimeLeftPipe } from './pipes/display-time-left.pipe';
import { NotificationService } from './services/notification.service';
import { WebNotificationService } from './services/web-notification.service';
import { AddTimerComponent } from './timers/add-timer/add-timer.component';
import { TimerComponent } from './timers/timer/timer.component';
import { TimersComponent } from './timers/timers.component';

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
    BrowserAnimationsModule,
  ],
  providers: [
    AppComponent,
    {provide: NotificationService, useClass: WebNotificationService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
