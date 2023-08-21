import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DateString, Recurrency } from "./recurrency.model";

@Component({
  selector: 'app-recurrency-item',
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <ion-item lines="none">
      <ion-label>
        <h2>{{ title }}</h2>
        <p>Last event: {{ lastEventCH }}</p>
        <p>Period: {{ periodString }}</p>
      </ion-label>
      <ion-label slot="end">
        <h2>{{ expiryDateCH }}</h2>
        <p>{{ periodLeftString }}</p>
      </ion-label>
    </ion-item>
    <ion-progress-bar [value]="progress" [color]="progressColor"></ion-progress-bar> -->
  `,
  styles: [``]
})
export class RecurrencyItemComponent {

  // @Input('recurrency')
  // recurrencyInput!: Recurrency;

  // title = this.getTitle(this.recurrencyInput)
  // lastEventCH = formatCH(this.recurrencyInput.lastEvent)
  // periodString = this.getPeriodString(this.recurrencyInput)


  // getTitle(recurrency: Recurrency): string {
  //   return recurrency.title
  // }

  // getPeriodString(recurrency: Recurrency): string {
  //   const { nb, unit } = recurrency.period;
  //   const unitString = nb > 1 ? unit : unit.replace(/s$/, '');
  //   return `${nb} ${unitString}`;
  // }

}
