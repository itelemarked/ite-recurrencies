import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
      (switchToSignup)="onSwitchTo('signup')"
      (login)="requestOutput.emit({type: 'login', data: $event})"
    ></app-login>

    <app-signup
      @fadeIn
      *ngIf="userInput === null && loginOrSignup === 'signup'"
      (switchToLogin)="onSwitchTo('login')"
      (signup)="requestOutput.emit({type: 'signup', data: $event})"
    ></app-signup>

  `,
  styles: [`
    :host {
      display: block;
      margin: 10px;
      min-width: 300px;
      max-width: 400px;
    }
  `],
})
export class AuthFormComponent {

  loginOrSignup: 'login' | 'signup' = 'login'

  @Input('user')
  userInput!: {username: string} | null;

  @Output('request')
  requestOutput = new EventEmitter<Request>()

  onSwitchTo(loginSignup: 'login' | 'signup') {
    this.loginOrSignup = loginSignup;
  }

}
