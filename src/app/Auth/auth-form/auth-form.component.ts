import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { LogoutComponent } from './logout.component';


export type State =
| {
    type: 'loggedIn'
  }
| {
    type: 'signedUp'
  }
| {
    type: 'loggedOut',
    username: string
  }


export type Request =
| {
    type: 'login',
    data: {
      username: string,
      password: string
    }
  }
| {
    type: 'signup',
    data: {
      username: string,
      password: string
    }
  }
| {
    type: 'logout'
  }




@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, LoginComponent, SignupComponent, LogoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-login
      *ngIf="stateInput.type === 'loggedIn'"
      (stateChange)="stateChangeOutput.emit({type: 'signedUp'})"
      (login)="requestOutput.emit({type: 'login', data: $event})"
    ></app-login>

    <app-signup
      *ngIf="stateInput.type === 'signedUp'"
      (stateChange)="stateChangeOutput.emit({type: 'loggedIn'})"
      (signup)="requestOutput.emit({type: 'signup', data: $event})"
    ></app-signup>

    <app-logout
      *ngIf="stateInput.type === 'loggedOut'"
      [username]="stateInput.username"
      (logout)="requestOutput.emit({type: 'logout'})"
    ></app-logout>
  `,
  styles: [``],
})
export class AuthFormComponent {

  @Input('state')
  stateInput!: State

  @Output('stateChange')
  stateChangeOutput = new EventEmitter<State>()

  @Output('request')
  requestOutput = new EventEmitter<Request>()

}
