import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { getOffsetHours, getOffsetMinutes, getTimezoneDay, getTimezoneISOString, getTimezoneMonth, getTimezoneYear, toTimezoneOffset } from "../_testing/model5/timezone.utils";





function TEST() {

  const date = new Date('2022-06-01T01:00:00Z')
  const offset = toTimezoneOffset('-02:00')
  console.log(getTimezoneISOString(date, offset))

  // const reg1 = /(aaa)/
  // const reg2 = /(\d{2})/
  // console.log(('aaa12'.match(reg1.source + reg2.source)))
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
