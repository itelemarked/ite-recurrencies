import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recurrency } from './recurrency.model';

@Component({
  selector: 'app-recurrency-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <!-- <ion-modal #modal [trigger]="triggerInput">
      <ng-template> -->
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ recurrency.title }}</ion-title>
            <ion-buttons slot="end">
            <ion-button>Close</ion-button>
              <!-- <ion-button (click)="modal.dismiss()">Close</ion-button> -->
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content [forceOverscroll]="false">
          <ion-list>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Connor Smith</h2>
                <p>Sales Rep</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Daniel Smith</h2>
                <p>Product Designer</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=d"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Greg Smith</h2>
                <p>Director of Operations</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=e"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Zoey Smithh</h2>
                <p>CEO</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      <!-- </ng-template>
    </ion-modal> -->
  `,
  styles: [``],
})
export class RecurrencyEditModal {

  @Input()
  recurrency!: Recurrency;

  ngOnInit() {
    console.log(this.recurrency)
  }

}
