import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-list style="border: 1px solid lightgrey; border-radius: 10px; padding: 0;">

      <ion-item lines="none">
        <ion-label class="ion-text-center">
          <p>Your are currently logged in as:</p>
          <h3>{{ usernameInput }}</h3>
        </ion-label>
      </ion-item>

      <div class="ion-padding-top">
        <ion-button
          expand="full"
          color="danger"
          (click)="logoutOutput.emit()"
          class="ion-no-margin"
        >Logout</ion-button>
      </div>

    </ion-list>
  `,
  styles: [``],
})
export class LogoutComponent {

  @Input('username')
  usernameInput!: string

  @Output('logout')
  logoutOutput = new EventEmitter<void>()

}
