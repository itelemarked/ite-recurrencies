import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
// import { IsoString, Recurrency, RecurrencyPeriod } from '../recurrency.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recurrency-item-edit',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-list>
      <ion-item #lastFlightDate>
        <ion-input
          type="text"
          [value]="'23.03.2023'"
          label="Last flight date"
          labelPlacement="stacked"
        ></ion-input>
        <ion-button slot="end" fill="outline">Today</ion-button>
      </ion-item>

      <ion-item #period>
        <ion-input
          type="text"
          [value]="'66 days'"
          label="Period"
          labelPlacement="stacked"
        ></ion-input>
      </ion-item>

      <ion-item #expiryDate>
        <ion-input
          type="text"
          [value]="'09.07.2023'"
          label="Expiry date"
          labelPlacement="stacked"
        ></ion-input>
      </ion-item>
    </ion-list>
  `,
  styles: [
    `
      :host ::ng-deep .item-edited .native-input {
        color: blue;
      }
    `,
  ],
})
export class RecurrencyItemEdit1Component {

  // recurrency!: Recurrency;

  // @ViewChild('lastFlightDate', { read: ElementRef, static: true })
  // lastFlightDateEl!: ElementRef;

  // @ViewChild('period', { read: ElementRef, static: true })
  // periodEl!: ElementRef;

  // @ViewChild('expiryDate', { read: ElementRef, static: true })
  // expiryDateEl!: ElementRef;

  // constructor(private renderer: Renderer2, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     // this.recurrency = this.data.getRecurrencyById(params['id'])
  //   })
  //   this.renderEdited(this.lastFlightDateEl, true)
  // }

  // renderEdited(el: ElementRef, value: boolean) {
  //   value
  //     ? this.renderer.addClass(el.nativeElement, 'item-edited')
  //     : this.renderer.removeClass(el.nativeElement, 'item-edited');
  // }

  // onCancel(datetime: IonDatetime) {}

  // onToday(datetime: IonDatetime) {}

  // onOk(datetime: IonDatetime) {}
}
