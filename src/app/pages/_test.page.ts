import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { getOffsetHours, getOffsetMinutes, getTimezoneDay, getTimezoneISOString, getTimezoneMonth, getTimezoneYear, toTimezoneOffset } from "../_testing/model5/timezone.utils";
import { DateTime, Interval, Settings } from "luxon";






function TEST() {

  const d1 = DateTime.fromISO('2022-06-01').valueOf()
  const d2 = DateTime.fromISO('2022-06-03').valueOf()
  const interval = d1 - d2
  console.log(interval)
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
