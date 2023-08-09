import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { State, Request } from './auth-form.component';



function sameAsValidator(exp: string = 'aaa'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = control.value.trim() !== '' && control.value !== exp
    return invalid ? { notSameAs: true } : null;
  };
}



@Component({
  selector: 'app-signup',
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

        <ion-item [ngClass]="{'app-invalid': isInvalid('confirmPasswordCtl')}">
          <ion-label position="stacked">
            Confirm Password
            <span *ngIf="isInvalid('confirmPasswordCtl')">is not the same as password...</span>
          </ion-label>
          <ion-input
            type="password"
            formControlName="confirmPasswordCtl"
            placeholder="Confirm password"
          ></ion-input>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button expand="full" (click)="onSignup()">Signup</ion-button>
        </div>

        <div class="ion-padding-top">
          Already have an account?
          <ion-text color="primary" (click)="stateChangeOutput.emit({type: 'loggedIn'})">Login</ion-text>
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
export class SignupComponent {

  @Output('stateChange')
  stateChangeOutput = new EventEmitter<State>()

  @Output('signup')
  signupOutput = new EventEmitter<{username: string, password: string}>()

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usernameCtl: ['', Validators.required],
      passwordCtl: ['', [Validators.required, Validators.minLength(6)]],
      confirmPasswordCtl: ['', sameAsValidator()]
    })

    // this.form.addValidators()
  }

  onSignup() {
    this.form.markAllAsTouched()

    if (!this.form.valid) return;

    const username = this.form.get('usernameCtl')!.value!
    const password = this.form.get('passwordCtl')!.value!
    this.signupOutput.emit({username, password})
  }

  isInvalid(ctlName: string): boolean {
    const ctl = this.form.get(ctlName)
    return ctl !== null && ctl.touched && ctl.invalid
  }

}
