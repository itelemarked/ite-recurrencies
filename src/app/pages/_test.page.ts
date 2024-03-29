import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DateTime } from "luxon";






function TEST() {

  const d = DateTime.fromISO('2022-06-01', {zone: 'UTC-4'})
  console.log(d)

}






@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>TEST</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">

    </ion-content>
  `,
  styles: [``],
})
export class TestPage {

  constructor() {
    TEST();
  }
}
