import { Component, OnInit, Inject, Input } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-social-dialog',
  templateUrl: './social-dialog.component.html',
  styleUrls: ['../../../../../../../modules/shared/styles/dialogs/dialog.scss']
})
export class SocialDialogComponent implements OnInit {
  userSocials: any = [];

  availableTypes = [
    {
      type: 'link',
      icon: 'fa-link',
      placeholder: 'https://denom.be',
      selected: true
    },
    {
      type: 'facebook',
      icon: 'fa-facebook',
      placeholder: 'https://facebook.com/your.username/'
    },
    {
      type: 'linkedin',
      icon: 'fa-linkedin',
      placeholder: 'https://linkedin.com/in/username/'
    },
    {
      type: 'twitter',
      icon: 'fa-twitter',
      placeholder: 'https://twitter.com/in/YourUsername/'
    },
    {
      type: 'github',
      icon: 'fa-github',
      placeholder: 'https://github.com/username'
    }
  ];

  constructor(
    private fs: FirestoreService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<SocialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userSocials = this.data;
  }
  ngOnInit() {}
  async addSocial(url, type) {
    this.userSocials.push({ type: type.type, url });
  }

  onRemove(index) {
    this.userSocials.splice(index, 1);
  }

  submit(): void {
    console.log(this.userSocials);
    this.fs
      .updateDocument('users', this.auth.getLocalUserId(), {
        ...this.userSocials
      })
      .then(() => {
        this.close();
      });
  }
  close() {
    this.dialogRef.close();
  }
}
