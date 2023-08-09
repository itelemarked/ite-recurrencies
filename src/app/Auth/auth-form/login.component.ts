import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { State } from './auth-form.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <ion-list>

        <ion-item [ngClass]="{'app-invalid': isInvalid('usernameCtl')}">
          <ion-label position="stacked">
            Username
            <span *ngIf="isInvalid('usernameCtl')">required...</span>
          </ion-label>
          <ion-input
            type="text"
            formControlName="usernameCtl"
            placeholder="Enter a username"
          ></ion-input>
        </ion-item>

        <ion-item [ngClass]="{'app-invalid': isInvalid('passwordCtl')}">
          <ion-label position="stacked">
            Password
            <span *ngIf="isInvalid('passwordCtl')">must be at least 6 characters...</span>
          </ion-label>
          <ion-input
            type="password"
            formControlName="passwordCtl"
            placeholder="Enter a password"
          ></ion-input>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button expand="full" (click)="onLogin()">Login</ion-button>
        </div>

        <div class="ion-padding-top">
          Don't have an account yet?
          <ion-text color="primary" (click)="stateChangeOutput.emit({type: 'signedUp'})">Signup</ion-text>
        </div>

      </ion-list>
    </form>
  `,
  styles: [`
    .app-invalid {
      color: red;
    }
  `],
})
export class LoginComponent {

  @Output('login')
  loginOutput = new EventEmitter<{username: string, password: string}>()

  @Output('stateChange')
  stateChangeOutput = new EventEmitter<State>()

  form = this.fb.group({
    usernameCtl: ['', Validators.required],
    passwordCtl: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder) {}

  onLogin() {
    this.form.markAllAsTouched()

    if (!this.form.valid) return;

    const username = this.form.get('usernameCtl')!.value!
    const password = this.form.get('passwordCtl')!.value!
    this.loginOutput.emit({username, password})
  }

  isInvalid(ctlName: string): boolean {
    const ctl = this.form.get(ctlName)
    return ctl !== null && ctl.touched && ctl.invalid
  }

}
