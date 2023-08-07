import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Observable, map } from 'rxjs';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Recurrencies</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onAddRecurrency()">
            <ion-icon slot="icon-only" name="add-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <ion-list>

        <!-- <app-recurrency-item
          *ngFor="let recurrency of recurrencies$ | async"
          [recurrency]="recurrency"
          (click)="onOpenEditModal(recurrency)"
        ></app-recurrency-item> -->

      </ion-list>
    </ion-content>
  `,
  styles: [``],
})
export class RecurrencyListPage {
  recurrencies$: Observable<Recurrency[]>;

  constructor(private rec: RecurrenciesService, private modalCtrl: ModalController) {
    this.recurrencies$ = rec.getAll$().pipe(
      map(r => r.sort((a,b) => progress(b) - progress(a)))
    );
  }

  async onAddRecurrency() {
    const modal = await this.modalCtrl.create({
      component: RecurrencyEditModal,
      breakpoints: [0, 0.85],
      initialBreakpoint: 0.85,
    })

    await modal.present()

    const { data, role } = await modal.onWillDismiss()
    if (role === 'save') {
      // console.log('saving data:')
      // console.log(data)
      this.rec.save(data)
    }
  }

  async onOpenEditModal(recurrency: Recurrency) {
    const modal = await this.modalCtrl.create({
      component: RecurrencyEditModal,
      componentProps: { recurrency },
      breakpoints: [0, 0.85],
      initialBreakpoint: 0.85,
    })

    await modal.present()

    const { data, role } = await modal.onWillDismiss()
    if (role === 'save') {
      console.log('saving data:')
      console.log(data)
      this.rec.save(data)
    }
  }

}
