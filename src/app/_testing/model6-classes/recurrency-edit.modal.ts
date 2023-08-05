import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { IsoDate, PeriodUnit, Recurrency, RecurrencyInputType, computedIsoDate, copy, createRecurrency, toIsoDate, toPositiveInteger } from './recurrency.model3';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';




function isoDateValidator() {}

function positiveIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let isForbidden: boolean = false;
    try { toPositiveInteger(+control.value) }
    catch { isForbidden = true; }

    return isForbidden ? {nonPositiveInteger: true} : null;
  };
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}


@Component({
  selector: 'app-recurrency-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar></ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">

      <form [formGroup]="form">
        <ion-list>

          <ion-item>
            <ion-label position="stacked">Title</ion-label>
            <ion-input
              type="text"
              formControlName="titleCtl"
              placeholder="Enter a title"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Last event date</ion-label>
            <ion-input
              type="date"
              formControlName="lastEventCtl"
            ></ion-input>
          </ion-item>

          <ion-item class="inline-block">
            <ion-label position="stacked">Period</ion-label>
            <ion-input
              formControlName="periodNbCtl"
              placeholder="Enter a number"
              inputmode="decimal"
              [clearOnEdit]="true"
            ></ion-input>
          </ion-item>

          <ion-item class="inline-block">
            <ion-label position="stacked"></ion-label>
            <ion-select
              formControlName="periodUnitCtl"
              interface="action-sheet"
            >
              <ion-select-option value="day">days</ion-select-option>
              <ion-select-option value="week">weeks</ion-select-option>
              <ion-select-option value="month">months</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Expiry date</ion-label>
            <ion-input
              type="date"
              formControlName="expiryCtl"
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
      </form>
    </ion-content>
  `,
  styles: [
    `
      .inline-block {
        display: inline-block;
        width: 50%;
      }

      ion-input, ion-select {
        color: var(--ion-color-primary);
      }

      ion-item.ion-invalid.ion-touched {
        color: red;
      }
    `,
  ],
})
export class RecurrencyEditModal implements OnInit, OnDestroy {
  @Input()
  readonly recurrency?: Recurrency;

  // oldStatus: FormControlStatus = 'INVALID';
  id?: string;
  inputType: RecurrencyInputType = 'lastEvent';

  form = this.fb.group({
    titleCtl: ['', {
      validators: [Validators.required],
      // updateOn: 'blur'
    }],
    lastEventCtl: ['', Validators.required],
    expiryCtl: ['', Validators.required],
    periodNbCtl: ['', [Validators.required, positiveIntegerValidator()]],
    periodUnitCtl: ['', Validators.required],
  })

  get titleCtl() { return this.form.get('titleCtl')!; }
  get lastEventCtl() { return this.form.get('lastEventCtl')!; }
  get expiryCtl() { return this.form.get('expiryCtl')!; }
  get periodNbCtl() { return this.form.get('periodNbCtl')!; }
  get periodUnitCtl() { return this.form.get('periodUnitCtl')!; }

  private subscriptions: Subscription[] = [];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.recurrency) {
      this.setForm(this.recurrency)
      this.id = this.recurrency.id;
      this.inputType = this.recurrency.inputType;
    }

    this.subscribeAll()
  }

  onLastEventChange(val: string | null) {
    this.unsubscribeAll()
    if (this.periodNbCtl.valid && this.periodUnitCtl.valid && val !== null) {
      const newExpiry = computedIsoDate(
        toIsoDate(val),
        toPositiveInteger(+this.periodNbCtl.value!),
        this.periodUnitCtl.value! as PeriodUnit
      )

      this.expiryCtl.setValue(newExpiry);
      this.inputType = 'lastEvent';
    }
    this.subscribeAll()
  }

  onPeriodChange(val: string | null) {
    this.unsubscribeAll()
    if (this.periodNbCtl.valid && this.periodUnitCtl.valid) {
      if (this.inputType === 'lastEvent' && this.lastEventCtl.valid) {
        const newExpiry = computedIsoDate(
          toIsoDate(this.lastEventCtl.value!),
          +this.periodNbCtl.value!,
          this.periodUnitCtl.value! as PeriodUnit
        )
        this.expiryCtl.setValue(newExpiry)
      }

      if (this.inputType === 'expiry' && this.expiryCtl.valid) {
        const newLastEvent = computedIsoDate(
          toIsoDate(this.expiryCtl.value!),
          -(+this.periodNbCtl.value!),
          this.periodUnitCtl.value! as PeriodUnit
        )
        this.lastEventCtl.setValue(newLastEvent)
      }
    }
    this.subscribeAll()
  }

  onExpiryChange(val: string | null) {
    this.unsubscribeAll()
    if (this.periodNbCtl.valid && this.periodUnitCtl.valid && this.expiryCtl.valid) {
      const newLastEvent = computedIsoDate(
        toIsoDate(this.expiryCtl.value!),
        -(+this.periodNbCtl.value!),
        this.periodUnitCtl.value! as PeriodUnit
      )

      this.lastEventCtl.setValue(newLastEvent);
      this.inputType = 'expiry';
    }
    this.subscribeAll()
  }

  onSaveClick() {
    if (!this.form.valid) return;
    const recurrency = this.getRecurrency(this.form, this.inputType, this.id)
    this.modalCtrl.dismiss(recurrency, 'save')
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private subscribeAll() {
    this.subscriptions.push(this.lastEventCtl.valueChanges.subscribe(this.onLastEventChange.bind(this)))
    this.subscriptions.push(this.periodNbCtl.valueChanges.subscribe(this.onPeriodChange.bind(this)))
    this.subscriptions.push(this.periodUnitCtl.valueChanges.subscribe(this.onPeriodChange.bind(this)))
    this.subscriptions.push(this.expiryCtl.valueChanges.subscribe(this.onExpiryChange.bind(this)))
  }

  private unsubscribeAll() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.subscriptions = [];
  }

  private setForm(recurrency: Recurrency) {
    this.form.setValue({
      titleCtl: recurrency.title,
      lastEventCtl: recurrency.lastEvent,
      expiryCtl: recurrency.expiry,
      periodNbCtl: recurrency.period.nb.toString(),
      periodUnitCtl: recurrency.period.unit
    })
  }

  private getRecurrency(form: FormGroup, inputType: RecurrencyInputType, id?: string): Recurrency {
    return {
      id,
      inputType,
      title: form.getRawValue().titleCtl!,
      lastEvent: toIsoDate(form.getRawValue().lastEventCtl!),
      expiry: toIsoDate(form.getRawValue().expiryCtl!),
      period: {
        nb: toPositiveInteger(+form.getRawValue().periodNbCtl!),
        unit: form.getRawValue().periodUnitCtl! as PeriodUnit
      }
    }
  }

}
