import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (loggedIn) {
          this.router.navigate(['/profile']);
        }
      })
    );
  }
}
