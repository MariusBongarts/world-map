import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<firebase.default.User | null>(null);

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        await this.router.navigate(['dashboard']);
      } else {
        localStorage.setItem('user', '');
      }
      this.user.next(user);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '');
      return (user !== null && user.emailVerified !== false) ? true : false;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

  // Reset Forggot password
  async sendForgotPasswordEmail(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    return this.router.navigate(['sign-in']);
  }

}
