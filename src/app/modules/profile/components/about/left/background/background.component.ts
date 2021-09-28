import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @Input() user: User;
  bg: any;
  bgPreview = '';

  constructor(public auth: AuthService) {}

  onBgChanged(event) {
    this.bg = event.target.files[0];
    this.onBgUpload();
  }

  onBgUpload() {
    const ref = firebase
      .storage()
      .ref(
        'bg/' +
          this.user.uid +
          '/' +
          this.user.displayName +
          '/' +
          this.bg.name +
          Date.now()
      );
    ref.put(this.bg).then(u => {
      u.ref.getDownloadURL().then(newUrl => {
        this.auth.updateUserBg(newUrl);
        this.bgPreview = newUrl;
      });
    });
  }
  ngOnInit() {
    this.user.bgURL
      ? (this.bgPreview = this.user.bgURL)
      : (this.bgPreview = '/assets/add-bg.png');
  }
}
