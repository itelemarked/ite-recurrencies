import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons>

          <ion-menu-button menu="main-menu"></ion-menu-button>

          <!-- <ion-button id="menu-btn">
            <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
          </ion-button> -->

          <!-- <ion-button (click)="isOpen = true">
            <ion-icon slot="icon-only" name="menu-outline"></ion-icon>
          </ion-button> -->

        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <div style="text-align: center;">
          <p>Welcome to<br/>
          "ITE-RECURRENCIES"</p>
          <p><em>https://ite-recurrencies.xxxxxxxxx.com</em></p>
        </div>
      </div>
    </ion-content>

    <!-- <ion-popover trigger="menu-btn">
      <ng-template>
        <ion-content [forceOverscroll]="false" class="ion-padding">Hello World!</ion-content>
      </ng-template>
    </ion-popover> -->

    <!-- <ion-popover [isOpen]="isOpen" (didDismiss)="isOpen = false">
      <ng-template>
        <ion-content [forceOverscroll]="false" class="ion-padding">Hello World!</ion-content>
      </ng-template>
    </ion-popover> -->
  `,
  styles: [``],
})
export class HomePage {

  isOpen = false;
}

