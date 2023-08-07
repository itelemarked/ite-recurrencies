import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-recurrencies-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Recurrencies</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <h3>RecurrenciesListPage works!!</h3>
    </ion-content>
  `,
  styles: [``],
})
export class RecurrenciesListPage {}

