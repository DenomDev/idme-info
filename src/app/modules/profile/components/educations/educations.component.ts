import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Education } from 'app/models/education.model';
import { EducationService } from 'app/services/education.service';
import { EdDialogComponent } from './ed-dialog/ed-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.scss']
})
export class EducationsComponent implements OnInit {
  educations: Education[];
  @Input() user: any;
  newMode = false;
  canAdd = false;
  editMode: boolean;
  editEducation: Education;

  constructor(
    public auth: AuthService,
    public eps: EducationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.eps.getEducations(this.auth.getLocalUserId()).subscribe(x => {
      this.educations = x;
    });
  }

  public openDialog() {
    if (!this.editEducation) {
      this.editEducation = {
        type: 'certification',
        skills: [],
        institution: '',
        current: false,
        description: '',
        hasDate: false,
        location: '',
        name: ''
      };
    }

    this.dialog.open(EdDialogComponent, {
      data: this.editEducation,
      panelClass: 'dia-panel',
      backdropClass: 'dia-backdrop',
      hasBackdrop: true,
      disableClose: false
    });
  }

  editEdu(event: Education) {
    this.editEducation = event;
    this.openDialog();
  }
}
