import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from './user';
import { LogoutComponent } from './logout.component';
import { Request } from './request';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { animate, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, LogoutComponent, LoginComponent, SignupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])
    ])
  ],
  template: `

    <app-logout
      @fadeIn
      *ngIf="userInput !== null"
      [username]="userInput.username"
      (logout)="requestOutput.emit({type: 'logout'})"
    ></app-logout>

    <app-login
      @fadeIn
      *ngIf="userInput === null && loginOrSignup === 'login'"
      (login)="requestOutput.emit({type: 'login', data: $event})"
      (switchToSignup)="onSwitchTo('signup')"
    ></app-login>

    <app-signup
      @fadeIn
      *ngIf="userInput === null && loginOrSignup === 'signup'"
      (signup)="requestOutput.emit({type: 'signup', data: $event})"
      (switchToLogin)="onSwitchTo('login')"
    ></app-signup>

  `,
  styles: [``],
})
export class AuthFormComponent {

  loginOrSignup: 'login' | 'signup' = 'login'

  @Input('user')
  userInput!: User | null;

  @Output('request')
  requestOutput = new EventEmitter<Request>()

  onSwitchTo(loginSignup: 'login' | 'signup') {
    console.log(`switching to ${loginSignup}`)
    this.loginOrSignup = loginSignup;
  }

}
