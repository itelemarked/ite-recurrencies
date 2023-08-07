import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recurrency, RecurrencyPeriod } from './recurrency.class';



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
    this.lastEventDate = this.recurrency.lastEvent;
    this.period = this.periodString(period)
    this.expiryDate = this.recurrency.expiry()
    this.periodLeft = this.periodLeftString(this.recurrency)
    this.progress = this.getProgress(this.recurrency)
    this.progressColor = this.getProgressColor(this.recurrency, 0.75)
  }

  /** TODO */
  onRemoveRecurrency() {}

  private periodString(period: RecurrencyPeriod): string {
    const nbStr = period.nb.toString()
    const unitStr = period.nb > 1 ? period.unit : period.unit.replace(/s$/, '');

    return `${nbStr} ${unitStr}`
  }

  private periodLeftString(recurrency: Recurrency): string {
    const daysLeft = recurrency.remaining('days')
    const daysLeftStr = daysLeft.toString()
    const unitStr = daysLeft > 1 ? 'days' : 'day'
    if (daysLeft < 0) return 'Expired...'
    return `${daysLeftStr} ${unitStr} left`
  }

  private getProgress(recurrency: Recurrency): number {
    /** returns a number corresponding to today in regard to the last event and the expiry dates.
     *  E.g: today before lastEvent: progress smaller than 0.
     *  E.g: today on lastEvent: progress = 0
     *  E.g: today between lastEvent and expiry: progress between 0 and 1
     *  E.g: today on expiry: progress = 1
     *  E.g: today after expiry: progress > 1
     */
    return recurrency.progress()
  }

  private getProgressColor(recurrency: Recurrency, threshold: number): string {
    if (this.getProgress(recurrency) < threshold) return 'primary';
    if (this.getProgress(recurrency) > 1) return 'danger';
    return 'warning';
  }

}
