import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DateCH } from './date-ch.model';



@Component({
  selector: 'app-recurrency-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Recurrencies</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <h3>RecurrenciesListPage works!!</h3>
    </ion-content>
  `,
  styles: [``],
})
export class RecurrencyListPage {


  constructor() {
    // const rec = new Recurrency({
    //   title: 'P7',
    //   lastEvent: '2023-06-01',
    //   period: {
    //     nb: 188,
    //     unit: 'days'
    //   }
    // })

    // console.log(rec.getExpiry({format: 'ch'}))
  }

}

