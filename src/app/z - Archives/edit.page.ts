import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecurrencyItemEdit1Component } from './recurrency-item-edit1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RecurrencyItemEdit1Component],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>Cancel</ion-button>
        </ion-buttons>
        <ion-title>Edit **Title**</ion-title>
        <ion-buttons slot="end">
          <ion-button>Save</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">

      <app-recurrency-item-edit></app-recurrency-item-edit>

    </ion-content>
  `,
  styles: [``],
})
export class EditPage {}
