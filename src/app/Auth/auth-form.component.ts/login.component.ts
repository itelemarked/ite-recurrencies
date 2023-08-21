import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ion-list style="border: 1px solid lightgrey; border-radius: 10px; padding: 0;">

        <ion-item>
          <ion-label position="stacked">
            Username
            <span class="error">required...</span>
          </ion-label>
          <ion-input
            type="text"
            formControlName="usernameCtl"
            placeholder="Enter a username"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Password
            <span class="error">must be at least 6 characters...</span>
          </ion-label>
          <ion-input
            type="password"
            formControlName="passwordCtl"
            placeholder="Enter a password"
          ></ion-input>
        </ion-item>

        <ion-item lines="none" class="ion-padding-top">
          Don't have an account yet?
          <ion-text color="primary" (click)="switchToSignupOutput.emit()" style="padding-left: 0.5em;"><b>Signup</b></ion-text>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button
            class="ion-no-margin"
            expand="full"
            type="submit"
          >Login</ion-button>
        </div>

      </ion-list>
    </form>
  `,
  styles: [`
    .ng-submitted ion-item.ion-invalid {
      color: red;
    }

    .error {
      visibility: hidden;
    }

    .ng-submitted ion-item.ion-invalid .error {
      visibility: visible;
    }
  `],
})
export class LoginComponent {

  @Output('login')
  loginOutput = new EventEmitter<{username: string, password: string}>()

  @Output('switchToSignup')
  switchToSignupOutput = new EventEmitter<void>()

  form = this.fb.group({
    usernameCtl: ['', Validators.required],
    passwordCtl: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (!this.form.valid) return;

    const username = this.form.get('usernameCtl')!.value!
    const password = this.form.get('passwordCtl')!.value!
    this.loginOutput.emit({username, password})
  }

}
