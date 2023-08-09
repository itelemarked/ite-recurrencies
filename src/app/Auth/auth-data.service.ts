import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { Observable, map } from "rxjs";
import { User } from "./auth-form/user";



const SUFFIX = '@aaa.com'

function toUsername(email: string) {
  return email.replace(SUFFIX, '')
}

function toEmail(username: string) {
  return username + SUFFIX;
}




@Injectable({ providedIn: 'root' })
export class AuthDataService {

  constructor(private auth: Auth) {}

  getUser$(): Observable<User | null> {
    // onAuthStateChanged(this.auth, (res) => console.log)
    return user(this.auth).pipe(
      map(usr => {
        if (usr === null) return null
        const username = toUsername(usr.email!)
        const uid = usr.uid
        return {username, uid}
      })
    )
  }

  login(username: string, password: string) {
    const email = toEmail(username)
    signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    signOut(this.auth);
  }

}
