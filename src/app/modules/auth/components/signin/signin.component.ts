import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loaded: boolean;
  emailSent: boolean;
  emailValid = false;
  email = '';
  constructor(
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.user) {
      this.router.navigateByUrl('/profile');
    }
  }
  googleSignIn() {
    this.loaded = false;

    this.auth
      .googleSignIn()
      .then(u => {
        this.router.navigateByUrl('/profile');
      })
      .catch(err => {
        console.log(err.message);
        this.loaded = true;
      });
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');
        if (result.additionalUserInfo.isNewUser) {
          this.auth.updateUserData({ ...result.user }).then(x => {
            this.router.navigateByUrl('/profile');
          });
        }
      }
    } catch (err) {
      console.log(err.message);
      this.loaded = true;
    }
  }

  async sendEmailLink() {
    const actionCodeSettings = {
      // Your redirect URL
      url: 'https://idme.info/auth',
      handleCodeInApp: true
    };
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (err) {
      console.log(err.message);
      this.loaded = true;
    }
  }
  onInput(value: any): void {
    this.emailValid = this.isEmail(value);
    this.email = value;
  }
  submit() {
    this.sendEmailLink();
  }
  onChange(value: any): void {
    // this.changeEvent = value;
  }
  isEmail(search: string): boolean {
    let serchfind: boolean;

    const regexp = new RegExp(
      // tslint:disable-next-line: max-line-length
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    serchfind = regexp.test(search);
    return serchfind;
  }
}
