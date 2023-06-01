import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      home component works
      <ion-button>btn</ion-button>
    </ion-content>
  `,
  styles: [``]
})
export class HomePage {}
