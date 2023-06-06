import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { PeriodUnit, Recurrency, RecurrencyPeriod } from './recurrency.model';



@Component({
  selector: 'app-date-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-modal
      [trigger]="triggerInput"
      [keepContentsMounted]="true"
      >
      <ng-template>
        <ion-datetime
          #datetime
          [value]="valueInput"
          presentation="date"
          (ionChange)="onValueChange($event)">
          <span *ngIf="titleInput !== undefined"slot="title">{{ titleInput }}</span>
          <ion-buttons slot="buttons">
            <ion-button color="danger" (click)="datetime.cancel(true)">Cancel</ion-button>
            <ion-button color="primary" (click)="onTodayClick(datetime)">TODAY</ion-button>
            <ion-button color="primary" (click)="datetime.confirm(true)">Ok</ion-button>
          </ion-buttons>
        </ion-datetime>
      </ng-template>
    </ion-modal>
  `,
  styles: [`
    ion-modal {
      --width: fit-content;
      --height: fit-content;
      --border-radius: 8px;
    }
  `]
})
export class DateModal {

  @Input('trigger')
  triggerInput!: string;

  @Input('value')
  valueInput!: string;

  @Input('title')
  titleInput?: string;

  @Output('valueChange')
  valueChangeOutput = new EventEmitter<string>()

  onValueChange(e: any) {
    this.valueChangeOutput.emit(e.detail.value);
  }

  onTodayClick(datetime: IonDatetime) {
    const today = new Date()
    const todayIso = today.toISOString().match(/(^\d{4}-\d{2}-\d{2})/)![1]
    datetime.reset(todayIso);
    datetime.confirm(true)
  }

}





@Component({
  selector: 'app-recurrency-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, DateModal],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>Cancel</ion-button>
        </ion-buttons>
        <ion-title>{{ recurrency.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>Save</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content [forceOverscroll]="false">
      <ion-list>
        <ion-item id="open-last-modal">
          <ion-label>
            <h2 class="smaller">Last</h2>
            <h2 class="edited">{{ lastValue }}</h2>
          </ion-label>
          <app-date-modal
            trigger="open-last-modal"
            [value]="lastValue"
            (valueChange)="onLastValueChange($event)">
          </app-date-modal>
        </ion-item>

        <!-- <ion-item>
          <ion-label>
            <h2 class="smaller">Period</h2>
            <h2>66 days</h2>
          </ion-label>
        </ion-item> -->

        <!-- <ion-item style="display: inline-block; width: 50%;">
          <ion-input value="66" label="Period" labelPlacement="stacked"></ion-input>
        </ion-item>

        <ion-item style="display: inline-block; width: 50%;">
          <ion-input value="days" label="." labelPlacement="stacked"></ion-input>
        </ion-item> -->

        <ion-item>
        <div style="display: inline-block; width: 50%;">
          <ion-input value="66" label="Period" labelPlacement="stacked"></ion-input>
        </div>

        <div class="app-select" style="display: inline-block; width: 50%;">
          <ion-select interface="popover" label="." labelPlacement="stacked">
            <ion-select-option value="days">Days</ion-select-option>
            <ion-select-option value="weeks">Weeks</ion-select-option>
            <ion-select-option value="months">Months</ion-select-option>
          </ion-select>
        </div>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2 class="smaller">Expiry</h2>
            <h2>2023-03-01</h2>
          </ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  `,
  styles: [
    `
      .smaller {
        font-size: 0.7em;
      }

      .edited {
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
  recurrency!: Recurrency;

  lastValue = '2022-02-02'

  constructor(renderer: Renderer2) {}

  ngOnInit() {}

  onLastValueChange(val: string) {
    this.lastValue = val;
    console.log('last value has changed')
  }

  // private dateWithPeriod(initialDate: string, periodValue: number, periodUnit: PeriodUnit): string {}
}






