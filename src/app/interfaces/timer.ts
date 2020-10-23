import { Subscription } from 'rxjs';

export interface Timer {
  endDate: Date;
  description: string;
  subscription?: Subscription;
}
