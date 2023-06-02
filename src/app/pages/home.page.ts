import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { RecurrenciesService } from '../recurrencies/recurrencies.service';
import { Observable } from 'rxjs';
import { Recurrency } from '../recurrencies/recurrency.model';
import { RecurrencyItem1Component } from '../recurrencies/recurrency-item1.component';
import { RecurrencyEditModal } from '../recurrencies/recurrenciy-edit.modal';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule, RecurrencyItem1Component, RecurrencyEditModal],
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

        <ion-item>
          <ion-label>
            <h1>IR rating</h1>
          <p>last: 2023-01-01</p>
          <p>period: 60 days</p>
          </ion-label>
          <ion-label slot="end">
            <h1>03.02.2022</h1>
            <p>32 days remaining</p>
          </ion-label>
        </ion-item>

        <app-recurrency-item1
          *ngFor="let recurrency of recurrencies$ | async"
          [item]="recurrency"
          (click)="onOpenEditModal(recurrency)"
        ></app-recurrency-item1>

        <!-- <ion-button id="open-modal" expand="block">Open Card Modal</ion-button> -->

        <!-- <app-recurrency-edit-modal trigger="open-modal"></app-recurrency-edit-modal> -->

      </ion-list>
    </ion-content>
  `,
  styles: [``],
})
export class HomePage {
  recurrencies$: Observable<Recurrency[]>;

  constructor(private rec: RecurrenciesService, private modalCtrl: ModalController) {
    this.recurrencies$ = rec.getAll$();
  }

  onAddRecurrency() {}

  async onOpenEditModal(recurrency: Recurrency) {
    const modal = await this.modalCtrl.create({
      component: RecurrencyEditModal,
      componentProps: { recurrency },
      breakpoints: [0, 0.85],
      initialBreakpoint: 0.85,
      // backdropDismiss: false,
    })

    modal.present()
  }
}
