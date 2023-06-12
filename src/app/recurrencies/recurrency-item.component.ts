import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/** TODO: update to recurrency.model2 */
import { Recurrency, RecurrencyPeriod, addPeriod, expiry, formattedDate, today } from './recurrency.model';

@Component({
  selector: 'app-recurrency-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-item-sliding>

      <ion-item>
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

  @Input('item')
  itemInput!: Recurrency;

  title!: string;
  lastEventDate!: string;
  period!: string;
  /** TODO */
  periodLeft: string = '99 days left';
  expiryDate!: string;

  ngOnInit(): void {
    const { title, lastEvent, period } = this.itemInput;
    this.title = title;
    this.lastEventDate = formattedDate(lastEvent);
    this.period = this.periodString(period)

    /** TODO */
    this.periodLeft = this.periodLeftString(this.itemInput.lastEvent, this.itemInput.period)
    this.expiryDate = formattedDate(addPeriod(lastEvent, period.value, period.unit))
  }

  /** TODO */
  onRemoveRecurrency() {}

  private periodString(period: RecurrencyPeriod): string {
    const suffix = period.value > 1 ? 's' : '';
    return period.value.toString() + ' ' + period.unit + suffix;
  }

  private periodLeftString(lastEvent: string, period: RecurrencyPeriod) {
    const expiryMs = new Date(expiry(this.itemInput)).getTime()
    const todayMs = new Date(today()).getTime()

    const diff = expiryMs - todayMs
    if (diff < 0) {
      return 'Expired...!'
    } else {
      const dayLeft = Math.round(diff / 24 / 60 / 60 / 1000)
      const suffix = dayLeft > 1 ? 's' : '';
      return `${dayLeft} day${suffix} left`;
    }
  }

}
