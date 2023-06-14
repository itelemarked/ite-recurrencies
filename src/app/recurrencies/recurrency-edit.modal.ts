import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { IonDatetime, IonicModule, ModalController } from '@ionic/angular';
import { IRecurrencyData, IsoDate, Recurrency, toIsoDate } from './recurrency.model3';

// @Component({
//   selector: 'app-date-modal',
//   standalone: true,
//   imports: [CommonModule, IonicModule],
//   template: `
//     <ion-modal [trigger]="triggerInput" [keepContentsMounted]="true">
//       <ng-template>
//         <ion-datetime
//           #datetime
//           [value]="valueInput"
//           presentation="date"
//           (ionChange)="onValueChange($event)"
//         >
//           <span *ngIf="titleInput !== undefined" slot="title">{{
//             titleInput
//           }}</span>
//           <ion-buttons slot="buttons">
//             <ion-button color="danger" (click)="datetime.cancel(true)"
//               >Cancel</ion-button
//             >
//             <ion-button color="primary" (click)="onTodayClick(datetime)"
//               >TODAY</ion-button
//             >
//             <ion-button color="primary" (click)="datetime.confirm(true)"
//               >Ok</ion-button
//             >
//           </ion-buttons>
//         </ion-datetime>
//       </ng-template>
//     </ion-modal>
//   `,
//   styles: [
//     `
//       ion-modal {
//         --width: fit-content;
//         --height: fit-content;
//         --border-radius: 8px;
//       }
//     `,
//   ],
// })
// export class DateModal {
//   @Input('trigger')
//   triggerInput!: string;

//   @Input('value')
//   valueInput!: string;

//   @Input('title')
//   titleInput?: string;

//   @Output('valueChange')
//   valueChangeOutput = new EventEmitter<string>();

//   onValueChange(e: any) {
//     this.valueChangeOutput.emit(e.detail.value);
//   }

//   onTodayClick(datetime: IonDatetime) {
//     const today = new Date();
//     const todayIso = today.toISOString().match(/(^\d{4}-\d{2}-\d{2})/)![1];
//     datetime.reset(todayIso);
//     datetime.confirm(true);
//   }
// }

@Component({
  selector: 'app-recurrency-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar></ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <ion-list>

        <ion-item>
          <ion-input
            type="text"
            label="Title"
            labelPlacement="stacked"
            [value]="title"
            placeholder="Enter a title"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            type="date"
            label="Last event date"
            labelPlacement="stacked"
            [value]="lastEvent"
          ></ion-input>
        </ion-item>

        <ion-item style="display: inline-block; width: 30%;">
          <ion-input
            [value]="periodNb"
            placeholder="Enter a number"
            label="Period"
            labelPlacement="stacked"
            inputmode="decimal"
            [clearOnEdit]="true"
          ></ion-input>
        </ion-item>

        <ion-item class="app-select" style="display: inline-block; width: 70%;">
          <ion-select
            [value]="periodUnit"
            interface="action-sheet"
            label="&nbsp;"
            labelPlacement="stacked"
          >
            <ion-select-option value="day">days</ion-select-option>
            <ion-select-option value="week">weeks</ion-select-option>
            <ion-select-option value="month">months</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-input
            type="date"
            label="Expiry date"
            labelPlacement="stacked"
            [value]="expiry"
          ></ion-input>
        </ion-item>

        <div style="padding: 20px 10px;">
          <ion-button
            fill="outline"
            expand="block"
            (click)="onSaveClick()"
          >SAVE</ion-button>
        </div>

      </ion-list>
    </ion-content>
  `,
  styles: [
    `
      ion-input ::ng-deep.native-input, ion-select {
        color: var(--ion-color-primary);
      }

      .app-select ::part(icon), .app-select .label-text {
        opacity: 0;
      }
    `,
  ],
})
export class RecurrencyEditModal {
  @Input()
  recurrency?: Recurrency;

  title: string = '';
  lastEvent: string = toIsoDate('today');
  expiry: string = '';
  periodNb: string = '';
  periodUnit: string = 'day';

  constructor(private modalCtrl: ModalController) {
    console.log('modal constructor')
  }

  onSaveClick() {
    const recurrencyCopy = {
      ...this.recurrency,
      period: {
        ...this.recurrency?.period
      }
    }
    this.modalCtrl.dismiss(recurrencyCopy, 'save')
  }

}
