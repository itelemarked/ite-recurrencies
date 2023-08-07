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
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">
      <h3>HomePage works!</h3>
    </ion-content>
  `,
  styles: [``],
})
export class HomePage {}

