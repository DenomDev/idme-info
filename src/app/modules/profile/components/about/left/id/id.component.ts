import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from 'app/services/auth.service';
import { IdDialogComponent } from './id-dialog/id-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: [
    '../../../../../../modules/shared/styles/cards/card.scss',
    './id.component.scss'
  ]
})
export class IdComponent implements OnInit {
  avatar: '';
  image: any;
  @Input() user: any;
  imagePreview = '';

  constructor(public auth: AuthService, public dialog: MatDialog) {}
  onFileChanged(event) {
    this.image = event.target.files[0];
    this.onUpload();
  }
  onUpload() {
    const ref = firebase
      .storage()
      .ref(
        'avatars/' +
          this.user.uid +
          '/' +
          this.user.displayName +
          '/' +
          this.image.name
      );
    ref.put(this.image).then(u => {
      u.ref.getDownloadURL().then(newUrl => {
        this.auth.updateUserPicture(newUrl);
        this.imagePreview = newUrl;
      });
    });
  }
  ngOnInit() {
    this.user.photoURL
      ? (this.imagePreview = this.user.photoURL)
      : (this.imagePreview = '/assets/add-pro-pic.png');
  }
  openIdForm() {
    this.dialog.open(IdDialogComponent, {
      data: this.user,
      panelClass: 'dia-panel',
      backdropClass: 'dia-backdrop',
      hasBackdrop: true,
      disableClose: false
    });
  }
}
