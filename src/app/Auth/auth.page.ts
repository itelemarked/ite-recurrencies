import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthDataService } from './auth-data.service';
import { AuthFormComponent } from './auth-form.component.ts/auth-form.component';
import { Request } from './auth-form.component.ts/request';
import { map, take } from 'rxjs';



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

      <p style="display: none;">show: {{ show }}</p>

      <!-- <ion-spinner *ngIf="!show"></ion-spinner> -->

      <app-auth-form
        [user]="user$ | async"
        (request)="onRequest($event)"
      ></app-auth-form>

    </ion-content>
  `,
  styles: [``],
})
export class AuthPage {

  user$ = this.authData.getUser$().pipe(
    map(usr => {
      if (usr === null) return null
      return {username: usr.username}
    })
  )
  show = false

  constructor(private authData: AuthDataService) {
    this.user$.pipe(take(1)).subscribe(_ => {
      this.show = true;
    })
  }

  onRequest(request: Request) {
    switch (request.type) {
      case 'logout': {
        this.authData.logout()
        break;
      }
      case 'login': {
        const { username, password } = request.data
        this.authData.login(username, password)
        break;
      }
      case 'signup': {
        const { username, password } = request.data
        this.authData.signup(username, password)
        break;
      }
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
