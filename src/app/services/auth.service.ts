import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  public user: firebase.User = null;
  public userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  getUserData(uid): Observable<User> {
    return this.afs
      .doc<User>(`users/${uid}`)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data();
          const id = a.payload.id;
          return { id, ...data };
        })
      );
  }
  getUserDataFromUsername(username) {
    return this.afs
      .collection('users', ref => {
        return ref.where('username', '==', username);
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    if (credential.additionalUserInfo.isNewUser) {
      return this.registerNewUser(credential.user);
    } else {
      return this.updateUserData({
        uid: credential.user.uid,
        displayName: credential.user.displayName,
        email: credential.user.email,
        photoURL: credential.user.photoURL
      });
    }
  }
  async registerNewUser(user: User) {
    const services = [];
    const specializations = [];
    const skills = [];
    const links = [];
    const languages = [];
    const experiences = [];
    const educations = [];
    const contactEmail = user.email;
    const contactPhone = '';
    const username = '';
    const birthday = 0;
    return this.updateUserData({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      username,
      contactEmail,
      contactPhone,
      links,
      birthday,
      specializations,
      services,
      languages,
      skills,
      experiences,
      educations
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      ...user
    };
    return userRef.set(data, { merge: true });
  }

  getLocalUserId() {
    return JSON.parse(localStorage.getItem('user')).uid;
  }

  async requestPass(email) {
    return await this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async confirmPasswordReset(code, newPassword) {
    return await this.afAuth.auth.confirmPasswordReset(code, newPassword);
  }

  async verifyPasswordResetCode(code) {
    return await this.afAuth.auth.verifyPasswordResetCode(code);
  }

  async sendEmailLink(email: any) {
    const actionCodeSettings = {
      // Your redirect URL
      url: 'https://idme.info/',
      handleCodeInApp: true
    };

    await this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  }

  updateUserPicture(image) {
    const uid = this.getLocalUserId();
    this.afAuth.auth.currentUser
      .updateProfile({
        photoURL: image
      })
      .then(u => {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${uid}`
        );
        const data = {
          uid,
          photoURL: image
        };
        return userRef.set(data, { merge: true });
      });
  }
  updateUserBg(image) {
    const uid = this.getLocalUserId();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data = {
      uid,
      bgURL: image
    };
    return userRef.set(data, { merge: true });
  }
  getUsernames() {
    return this.afs
      .collection('users', ref => {
        return ref;
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, username: (data as any).username };
          });
        })
      );
  }
}
