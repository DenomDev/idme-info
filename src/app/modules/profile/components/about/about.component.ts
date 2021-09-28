import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user.model';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  constructor(public auth: AuthService) {}
  user: User;

  ngOnInit() {
    this.auth.getUserData(this.auth.getLocalUserId()).subscribe(u => {
      this.user = u as User;
    });
  }
}
