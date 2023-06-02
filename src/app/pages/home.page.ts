import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecurrenciesService } from '../recurrencies/recurrencies.service';
import { Observable } from 'rxjs';
import { Recurrency } from '../recurrencies/recurrency.model';
import { RecurrencyItem1Component } from '../recurrencies/recurrency-item1.component';

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

        <app-recurrency-item1 *ngFor="let recurrency of (recurrencies$ | async)" [item]="recurrency"></app-recurrency-item1>
      </ion-list>

    </ion-content>
  `,
  styles: [``],
})
export class HomePage {

  recurrencies$: Observable<Recurrency[]>;

  constructor(private rec: RecurrenciesService) {

    this.recurrencies$ = rec.getAll$()

  }

  onAddRecurrency() {}

}
