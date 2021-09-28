import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Experience } from 'app/models/experience.model';
import { ExperienceService } from 'app/services/experience.service';
import { XpDialogComponent } from './xp-dialog/xp-dialog.component';
import { MatDialog } from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  experiences: Experience[];
  editMode: boolean;
  editExperience: Experience;
  animal: string;
  name: string;
  constructor(
    public auth: AuthService,
    public xps: ExperienceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.xps.getExperiences(this.auth.getLocalUserId()).subscribe(x => {
      this.experiences = (x as Experience[]).sort((a, b) => {
        const dateA = this.getTime(new Date(a.startDate));
        const dateB = this.getTime(new Date(b.startDate));
        return dateB - dateA;
      });
    });
  }
  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
  getNewXp(xp) {
    this.experiences.push(xp);
    this.xps.updateUserExperiences(
      this.auth.getLocalUserId(),
      this.experiences
    );
  }

  editXpe(xp: Experience) {
    this.editExperience = xp;
    this.openDialog();
  }

  openDialog(): void {
    if (!this.editExperience) {
      this.editExperience = {
        type: 'job',
        skills: [],
        company: '',
        current: false,
        description: '',
        hasDate: false,
        location: '',
        name: ''
      };
    }
    this.dialog.open(XpDialogComponent, {
      data: this.editExperience,
      panelClass: 'dia-panel',
      backdropClass: 'dia-backdrop',
      hasBackdrop: true,
      disableClose: false
    });
  }
}
