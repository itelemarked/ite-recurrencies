import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Recurrency } from './recurrency.model';

@Component({
  selector: 'app-recurrency-edit-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
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
            <h2 class="edited">2023-01-01</h2>
          </ion-label>
        </ion-item>
        <ion-modal trigger="open-last-modal">
          <ng-template>
            <ion-datetime value="2022-02-02"></ion-datetime>
          </ng-template>
        </ion-modal>

        <ion-item>
          <ion-label>
            <h2 class="smaller">Period</h2>
            <h2>66 days</h2>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2 class="smaller">Expiry</h2>
            <h2>2023-03-01</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- <ion-datetime-button datetime="open-last-modal"></ion-datetime-button>

      <ion-modal [keepContentsMounted]="true">
        <ng-template>
          <ion-datetime id="open-last-modal"></ion-datetime>
        </ng-template>
      </ion-modal> -->

      <!-- <ion-modal
          trigger="open-last-modal"
          initialBreakpoint="0.85">
          <ng-template>
            <ion-header>
              <ion-toolbar>
                <ion-title>hi</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <ion-datetime
                value="2022-02-02"
              ></ion-datetime>
            </ion-content>
          </ng-template>
        </ion-modal> -->
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

      ion-modal {
        --width: 290px;
        --height: 382px;
        --border-radius: 8px;
      }

      ion-modal ion-datetime {
        height: 382px;
      }
    `,
  ],
})
export class RecurrencyEditModal {
  @Input()
  recurrency!: Recurrency;

  ngOnInit() {
    console.log(this.recurrency);
  }
}
