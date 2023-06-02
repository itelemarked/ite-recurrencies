import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecurrencyItem1Component } from './components/recurrency-item1.component';
import { DATAS, DataService, Recurrency } from './data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RecurrencyItem1Component],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onAddRecurrency()">
            <ion-icon slot="icon-only" name="add-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">

      <ion-list>
        <ion-item
          style="--min-height: 25px;--background: lightgrey;font-size: .8em;"
        >
          <div style="width: 15%;"></div>
          <div style="width: 30%; text-align: center;">last flight</div>
          <div style="width: 25%; text-align: center;">recurrence</div>
          <div style="width: 30%; text-align: center;">expiry</div>
        </ion-item>

        <app-recurrency-item1 *ngFor="let recurrency of recurrencies" [item]="recurrency"></app-recurrency-item1>
      </ion-list>

    </ion-content>
  `,
  styles: [``],
})
export class HomePage {

  recurrencies: Recurrency[] = [];

  constructor(private datas: DataService) {
    datas.recurrencies$.subscribe(recs => this.recurrencies = recs)
  }

  onAddRecurrency() {
    this.datas.createRecurrency({
      title: 'P7',
      lastFlight: '2022-02-02',
      period: {value: 94, unit: 'days'},
      expiry: '2022-03-03'
    })
  }

  // constructor(private datas: DataService) {
  //   this.datas.createRecurrency({
  //     title: 'P7',
  //     lastFlight: '2022-02-02',
  //     period: {value: 94, unit: 'days'},
  //     expiry: '2022-03-03'
  //   })

  //   this.datas.deleteRecurrency('id2')

  //   console.log(DATAS)
  // }
}
