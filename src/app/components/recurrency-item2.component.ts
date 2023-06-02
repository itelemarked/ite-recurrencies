import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
// import { Recurrency } from '../recurrency.model';

@Component({
  selector: 'app-recurrency-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <!-- <ion-item-sliding>

      <ion-item>
        <div style="width: 15%;">{{ itemInput.title }}</div>
        <div style="width: 30%; text-align: center;">
          <ion-datetime-button datetime="lastDateId"></ion-datetime-button>

          <ion-modal [keepContentsMounted]="true">
            <ng-template>
              <ion-datetime
                #lastFlightDate
                id="lastDateId"
                presentation="date"
                [value]="itemInput.lastFlight"
              >
                <ion-buttons slot="buttons">
                  <ion-button color="primary" (click)="onCancel(lastFlightDate)"
                    >CNL</ion-button
                  >
                  <ion-button color="primary" (click)="onToday(lastFlightDate)"
                    >TODAY</ion-button
                  >
                  <ion-button color="primary" (click)="onOk(lastFlightDate)"
                    >OK</ion-button
                  >
                </ion-buttons>
              </ion-datetime>
            </ng-template>
          </ion-modal>
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
          <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding> -->
  `,
  styles: [``],
})
export class RecurrencyItemComponent2 {

  // @Input('item')
  // itemInput!: Recurrency;

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
