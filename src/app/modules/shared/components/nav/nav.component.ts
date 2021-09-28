import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: any;

  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(u => {
      this.user = u;
    });
  }
  toggleHeader() {
    document.querySelector('.nav').classList.toggle('closed');
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }
  webpage(username) {
    this.router.navigateByUrl('/' + username);
  }
  cv(username) {
    this.router.navigateByUrl('/cv/' + username);
  }
  social() {}
  settings() {}
  async signout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/auth');
  }
  signin() {
    this.router.navigateByUrl('/');
  }
}
