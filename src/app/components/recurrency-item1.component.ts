import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataService, Recurrency } from '../data.service';
// import { Recurrency } from '../recurrency.model';

@Component({
  selector: 'app-recurrency-item1',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-item-sliding>

      <ion-item>
        <div style="width: 15%;">{{ itemInput.title }}</div>
        <div style="width: 30%; text-align: center;">
          {{ itemInput.lastFlight }}
        </div>
        <div style="width: 25%; text-align: center;">
          {{ itemInput.period.value + ' ' + itemInput.period.unit }}
        </div>
        <div style="width: 30%; text-align: center;">{{ itemInput.expiry }}</div>
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

  constructor(private datas: DataService) {}

  onRemoveRecurrency() {
    this.datas.deleteRecurrency(this.itemInput.id)
  }

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
