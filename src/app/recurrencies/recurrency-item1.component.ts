import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recurrency } from './recurrency.model';

@Component({
  selector: 'app-recurrency-item1',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-item-sliding>

      <!-- <ion-item>
        <div style="width: 15%;">{{ itemInput.title }}</div>
        <div style="width: 30%; text-align: center;">
          {{ itemInput.last }}
        </div>
        <div style="width: 25%; text-align: center;">
          {{ itemInput.period.value + ' ' + itemInput.period.unit }}
        </div>
        <div style="width: 30%; text-align: center;">{{ itemInput.expiry }}</div>
      </ion-item> -->

      <ion-item>
        <ion-label>
          <h2>{{ itemInput.title }}</h2>
          <p>last: {{ itemInput.last }}</p>
          <p>period: {{ itemInput.period.value }} {{ itemInput.period.unit }}</p>
        </ion-label>
        <ion-label slot="end">
          <h3>{{ itemInput.expiry }}</h3>
          <p>{{ daysLeft }} days left</p>
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
export class RecurrencyItem1Component {

  @Input('item')
  itemInput!: Recurrency;

  daysLeft: number = 99;

  constructor() {}

  onRemoveRecurrency() {}

  // onCancel(datetime: IonDatetime) {
  //   datetime.cancel(true);
  // }

  // async onToday(datetime: IonDatetime) {
  //   const newVal = new Date().toISOString()
  //   datetime.value = newVal
  //   await datetime.reset(newVal)
  //   datetime.confirm(true)
  // }

  // onOk(datetime: IonDatetime) {
  //   datetime.confirm(true);
  // }
}
