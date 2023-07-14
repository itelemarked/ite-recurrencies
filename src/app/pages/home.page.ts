import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { RecurrenciesService } from '../recurrencies/recurrencies.service';
import { Observable, map } from 'rxjs';
import { Recurrency, progress } from '../recurrencies/recurrency.model3';
import { RecurrencyItemComponent } from '../recurrencies/recurrency-item.component';
import { RecurrencyEditModal } from '../recurrencies/recurrency-edit.modal';
import { LocalOffset } from '../_testing/model5/LocalOffset';
import { LocalTimeString, toLocalTimeString, hh, mm, ss } from '../_testing/model5/local-time-string.type';
import { toPositiveInteger } from '../_testing/model5/positive-integer.type';
//import { LocalDateString, toLocalDateString, yyyy, mm, dd } from '../_testing/model5/local-date-string.type';
// import { LocalOffsetString, toLocalOffsetString, sign, hh as offsetHH, mm as offsetMM } from '../_testing/model5/local-offset-string.type';


function toLocalDate(localDate: string, localTime: string, localOffset: number): Date {
  const wrongUTC = new Date(localDate + 'T' + localTime + 'Z');
  wrongUTC.setHours(wrongUTC.getHours() - localOffset)
  const rightUTC = new Date(wrongUTC)
  return rightUTC;
}

function toLocalDate2(localDate: string, localTime: string, localOffset: string): Date {
  return new Date(localDate + 'T' + localTime + localOffset)
}

function toLocalString(utcDate: Date, offset: number): string {
  const utcDateCopy = new Date(utcDate)
  utcDateCopy.setHours(utcDateCopy.getHours() + offset)
  const wrongUTC = utcDateCopy;

  const yyyy = wrongUTC.getUTCFullYear().toString()
  const mm = (wrongUTC.getUTCMonth() + 1).toString().padStart(2, '0')
  const dd = wrongUTC.getUTCDate().toString().padStart(2, '0')
  const hours = wrongUTC.getUTCHours().toString().padStart(2, '0')
  const minutes = wrongUTC.getUTCMinutes().toString().padStart(2, '0')
  const seconds = wrongUTC.getUTCSeconds().toString().padStart(2, '0')

  return dd + '.' + mm + '.' + yyyy + ' ' + hours + ':' + minutes + ':' + seconds
}

function toLocalString2(utcDate: Date, offset: string): string {
  const utcDateCopy = new Date(utcDate)

  const offsetRegex = /^([+-])([0-9][0-9]|1[0-2]):([0-5][0-9])$/
  const offsetSign = offset.match(offsetRegex)![1]
  const offsetHours = +(offsetSign + offset.match(offsetRegex)![2])
  const offsetMinutes = +(offsetSign + offset.match(offsetRegex)![3])

  utcDateCopy.setHours(utcDateCopy.getHours() + offsetHours)
  utcDateCopy.setMinutes(utcDateCopy.getMinutes() + offsetMinutes)
  const wrongUTC = utcDateCopy

  const yyyy = wrongUTC.getUTCFullYear().toString()
  const mm = (wrongUTC.getUTCMonth() + 1).toString().padStart(2, '0')
  const dd = wrongUTC.getUTCDate().toString().padStart(2, '0')
  const hours = wrongUTC.getUTCHours().toString().padStart(2, '0')
  const minutes = wrongUTC.getUTCMinutes().toString().padStart(2, '0')
  const seconds = wrongUTC.getUTCSeconds().toString().padStart(2, '0')

  return dd + '.' + mm + '.' + yyyy + ' ' + hours + ':' + minutes + ':' + seconds
}

function TEST() {
  // const date = toLocalDate('2022-06-01', '01:00:00', 2)
  // console.log(date.toUTCString())
  // console.log(toLocalString(date, 3))

  // const date = new Date('2022-06-01T01:00:00+02:00')
  // console.log(date.toUTCString())

  const date = toLocalDate2('2022-06-01', '01:00:00', '+02:00')
  console.log(toLocalString2(date, '+03:00'))
}



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RecurrencyItemComponent, RecurrencyEditModal],
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

        <app-recurrency-item
          *ngFor="let recurrency of recurrencies$ | async"
          [recurrency]="recurrency"
          (click)="onOpenEditModal(recurrency)"
        ></app-recurrency-item>

      </ion-list>
    </ion-content>
  `,
  styles: [``],
})
export class HomePage {
  recurrencies$: Observable<Recurrency[]>;

  constructor(private rec: RecurrenciesService, private modalCtrl: ModalController) {
    this.recurrencies$ = rec.getAll$().pipe(
      map(r => r.sort((a,b) => progress(b) - progress(a)))
    );

    /** TO DELETE, TESTING ONLY */
    TEST();
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
