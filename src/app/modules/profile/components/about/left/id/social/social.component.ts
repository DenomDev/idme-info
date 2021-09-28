import { Component, Input } from '@angular/core';
import { SocialDialogComponent } from '../social-dialog/social-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  @Input() links;
  constructor(public dialog: MatDialog) {}

  openSocialDialog() {
    this.dialog.open(SocialDialogComponent, {
      data: this.links,
      panelClass: 'dia-panel',
      backdropClass: 'dia-backdrop',
      hasBackdrop: true,
      disableClose: false
    });
  }
}
