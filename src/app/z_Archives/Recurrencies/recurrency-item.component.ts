import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/** TODO: update to recurrency.model2 */
import { IsoDate, Recurrency, RecurrencyPeriod, formattedDate } from './recurrency.model3';

@Component({
  selector: 'app-recurrency-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-item-sliding>

      <ion-item lines="none">
        <ion-label>
          <h2>{{ title }}</h2>
          <p>Last event: {{ lastEventDate }}</p>
          <p>Period: {{ period }}</p>
        </ion-label>
        <ion-label slot="end">
          <h2>{{ expiryDate }}</h2>
          <p>{{ periodLeft }}</p>
        </ion-label>
      </ion-item>
      <ion-progress-bar [value]="progress" [color]="progressColor"></ion-progress-bar>

      <ion-item-options>
        <ion-item-option color="light">
          <ion-icon slot="icon-only" name="create-outline"></ion-icon>
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="icon-only" name="trash-outline" (click)="onRemoveRecurrency()"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  `,
  styles: [``],
})
export class RecurrencyItemComponent implements OnInit {

  @Input()
  recurrency!: Recurrency;

  title!: string;
  lastEventDate!: string;
  period!: string;
  expiryDate!: string;
  periodLeft!: string;
  progress!: number;
  progressColor!: string;


  ngOnInit(): void {
    const { title, lastEvent, period, expiry } = this.recurrency;
    this.title = title;
    this.lastEventDate = formattedDate(lastEvent);
    this.period = this.periodString(period)
    this.expiryDate = formattedDate(expiry)
    this.periodLeft = this.periodLeftString(this.recurrency.expiry)
    this.progress = this.getProgress(lastEvent, expiry)
    this.progressColor = this.getProgressColor(0.75)
  }

  /** TODO */
  onRemoveRecurrency() {}

  private periodString(period: RecurrencyPeriod): string {
    const suffix = period.nb > 1 ? 's' : '';
    return period.nb.toString() + ' ' + period.unit + suffix;
  }

  private periodLeftString(expiry: IsoDate) {
    const todayMs = new Date().setHours(0,0,0,0);
    const expiryMs = new Date(expiry).getTime();
    const daysLeft = Math.round((expiryMs - todayMs) / 24 / 60 / 60 / 1000);
    const suffix = daysLeft === 1 ? '' : 's'
    const daysLeftString = daysLeft < 0 ? 'Expired...!' : `${daysLeft} day${suffix} left`;
    return daysLeftString;
  }

  private getProgress(lastEvent: IsoDate, expiry: IsoDate): number {
    /** returns a number corresponding to today in regard to the last event and the expiry dates.
     *  E.g: today before lastEvent: progress smaller than 0.
     *  E.g: today on lastEvent: progress = 0
     *  E.g: today between lastEvent and expiry: progress between 0 and 1
     *  E.g: today on expiry: progress = 1
     *  E.g: today after expiry: progress > 1
     */
    const lastMs = new Date(lastEvent).getTime()
    const expiryMs = new Date(expiry).getTime()
    const todayMs = new Date().setHours(0,0,0,0)

    return (todayMs - lastMs) / (expiryMs - lastMs)
  }

  private getProgressColor(threshold: number): string {
    const { lastEvent, expiry } = this.recurrency;
    if (this.getProgress(lastEvent, expiry) < threshold) return 'primary';
    if (this.getProgress(lastEvent, expiry) > 1) return 'danger';
    return 'warning';
  }

}
