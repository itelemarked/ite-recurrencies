import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthDataService } from './auth-data.service';
import { AuthFormComponent } from './auth-form2.component.ts/auth-form.component';
import { Request } from './auth-form2.component.ts/request';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AuthFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [forceOverscroll]="false">

      <app-auth-form
        [user]="user$ | async"
        (request)="onRequest($event)"
      ></app-auth-form>

    </ion-content>
  `,
  styles: [``],
})
export class AuthPage {

  user$ = this.authData.getUser$()

  constructor(private authData: AuthDataService) {}

  onRequest(request: Request) {
    switch (request.type) {
      case 'logout':
        this.authData.logout()
        break;
      case 'login':
        const { username, password } = request.data
        this.authData.login(username, password)
        break;
    }
  }

  // state: State = {type: 'loggedOut', username: 'Bob Dylan'}

  // constructor(private authData: AuthDataService) {
  //   this.authData.getUser$().subscribe(this.onUserChange.bind(this))
  // }

  // onRequest(req: Request) {
  //   console.log(`request entered: ${req}`)
  //   console.log(req)
  // }

  // onUserChange(usr: User | null) {
  //   this.state = usr === null ? { type: 'loggedOut' } : { type: 'loggedIn', username: ''
  // }

}
