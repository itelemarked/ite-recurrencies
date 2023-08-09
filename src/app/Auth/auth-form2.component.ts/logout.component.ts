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

    <div class="ion-padding-top">
      Your are currently logged in as: <br>
      <b>{{ usernameInput }}</b>
    </div>

    <div class="ion-padding-top">
      <ion-button expand="full" color="danger" (click)="logoutOutput.emit()">Logout</ion-button>
    </div>
  `,
  styles: [``],
})
export class LogoutComponent {

  @Input('username')
  usernameInput!: string

  @Output('logout')
  logoutOutput = new EventEmitter<void>()

}
