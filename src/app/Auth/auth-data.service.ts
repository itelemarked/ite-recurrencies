import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { Observable, map } from "rxjs";
import { User } from "./user.model";



const DOMAIN = '@ite-recurrency.com'

function toUsername(email: string) {
  return email.replace(DOMAIN, '')
}

function toEmail(username: string) {
  return username + DOMAIN;
}




@Injectable({ providedIn: 'root' })
export class AuthDataService {

  constructor(private auth: Auth) {}

  getUser$(): Observable<User | null> {
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

  signup(username: string, password: string) {
    const email = toEmail(username)
    createUserWithEmailAndPassword(this.auth, email, password)
  }

}
