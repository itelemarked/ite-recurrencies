import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



// function confirmPasswordValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const passwordCtl = control.get('passwordCtl')
//     const confirmPasswordCtl = control.get('confirmPasswordCtl')
//     const isValid = passwordCtl && confirmPasswordCtl && passwordCtl.value === confirmPasswordCtl.value
//     return isValid ? null : { confirmPasswordError: true } ;
//   };
// }

function confirmPasswordValidator(passwordCtl: AbstractControl): ValidatorFn {
  return (confirmCtl: AbstractControl): ValidationErrors | null => {
    const isValid = confirmCtl.value === passwordCtl.value
    return isValid ? null : {confirmPasswordError: true}
  }
}



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ion-list style="border: 1px solid lightgrey; border-radius: 10px; padding: 0;">

        <ion-item>
          <ion-label position="stacked">
            Username
            <span class="error">
              required...
            </span>
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
            <span class="error">
              must be at least 6 characters...
            </span>
          </ion-label>
          <ion-input
            type="password"
            formControlName="passwordCtl"
            placeholder="Enter a password"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">
            Confirm Password
            <span class="error">
              password missmatch...
            </span>
          </ion-label>
          <ion-input
            type="password"
            formControlName="confirmPasswordCtl"
            placeholder="Confirm password"
          ></ion-input>
        </ion-item>

        <ion-item lines="none" class="ion-padding-top">
          Already have an account?
          <ion-text color="primary" (click)="switchToLoginOutput.emit()" style="padding-left: 0.5em;"><b>Login</b></ion-text>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button
            type="submit"
            expand="full"
            color="dark"
            class="ion-no-margin"
          >
            Signup
          </ion-button>
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
      padding-left: 1em;
    }

    .ng-submitted ion-item.ion-invalid .error {
      visibility: visible;
    }
  `],
})
export class SignupComponent {

  @Output('signup')
  signupOutput = new EventEmitter<{username: string, password: string}>()

  @Output('switchToLogin')
  switchToLoginOutput = new EventEmitter<void>()

  form = this.fb.group({
    usernameCtl: ['', Validators.required],
    passwordCtl: ['', [Validators.required, Validators.minLength(6)]],
    confirmPasswordCtl: ['']
  })

  constructor(private fb: FormBuilder) {
    this.form.get('confirmPasswordCtl')!.addValidators([
      Validators.required,
      confirmPasswordValidator(this.form.get('passwordCtl')!)
    ])
  }

  onSubmit() {
    console.log(this.form.get('confirmPasswordCtl')!.errors)
    if (!this.form.valid) return;

    const username = this.form.get('usernameCtl')!.value!
    const password = this.form.get('passwordCtl')!.value!
    this.signupOutput.emit({username, password})
  }

}
