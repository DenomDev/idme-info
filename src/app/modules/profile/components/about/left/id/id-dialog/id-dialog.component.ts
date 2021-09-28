import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'app/services/firestore.service';

@Component({
  selector: 'app-id-dialog',
  templateUrl: './id-dialog.component.html',
  styleUrls: ['../../../../../../../modules/shared/styles/dialogs/dialog.scss']
})
export class IdDialogComponent implements OnInit {
  profileForm: FormGroup;

  user: User;
  ngOnInit(): void {
    this.getUserData();
  }
  async getUserData() {
    await this.auth.user$.subscribe(res => {
      this.user = res;
      this.profileForm = this.fb.group({
        username: [
          this.user.username,
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(3)
          ]
        ],
        displayName: [this.user.displayName || '', [Validators.required]],
        location: [this.user.location || '', [Validators.required]],
        contactPhone: [this.user.contactPhone || '', []],
        contactEmail: [
          this.user.email || '',
          [Validators.required, Validators.email]
        ],
        birthday: [this.user.birthday || '', []],
        description: [this.user.description || '', []]
      });
    });
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,

    private fs: FirestoreService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.fs.updateDocument('users', this.user.uid, {
      username: this.profileForm.controls.username.value,
      displayName: this.profileForm.controls.displayName.value,
      contactPhone: this.profileForm.controls.contactPhone.value,
      contactEmail: this.profileForm.controls.contactEmail.value,
      location: this.profileForm.controls.location.value,
      birthday: this.profileForm.controls.birthday.value,
      description: this.profileForm.controls.description.value
    });

    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
