import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user.model';
import { ExperienceService } from 'app/services/experience.service';
import { Experience } from 'app/models/experience.model';
import { EducationService } from 'app/services/education.service';
import { Education } from 'app/models/education.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FirestoreService } from '../../../../services/firestore.service';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  username: string;
  user: User;
  experiences: Experience[];
  educations: Education[];

  jobs: Experience[];
  projects: Experience[];
  events: Experience[];
  studentJobs: Experience[];
  internships: Experience[];
  volunteerWorks: Experience[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public ps: ProfileService,
    public auth: AuthService,
    public fs: FirestoreService,
    public eds: EducationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.auth.getUserDataFromUsername(this.username).subscribe(u => {
        if (u !== null) {
          if (u[0] !== null && u.length === 1) {
            this.user = u[0] as User;
            this.getExperiencesJobs();
            this.getExperiencesProjects();
            this.getExperiencesEvents();
            this.getExperiencesStudentJobs();
            this.getExperiencesInternships();
            this.getExperiencesVolunteer();

            this.eds.getEducations(this.user.uid).subscribe(x => {
              this.educations = (x as Experience[]).sort((a, b) => {
                let dateA = 0;
                let dateB = 0;
                if (a.startDate) {
                  dateA = this.getTime(new Date(a.startDate));
                }
                if (b.startDate) {
                  dateB = this.getTime(new Date(b.startDate));
                }
                return dateB - dateA;
              });
            });
          } else {
            this.router.navigateByUrl('/profile');
          }
        }
      });
    });
  }
  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  public captureScreen() {
    const data = document.getElementById('cv');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  print() {
    window.print();
  }

  private getExperiencesJobs() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'job')
        )
        .subscribe(x => {
          this.jobs = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
          console.log(this.jobs);
        });
    }
  }
  private getExperiencesProjects() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'project')
        )
        .subscribe(x => {
          this.projects = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
  private getExperiencesEvents() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'event')
        )
        .subscribe(x => {
          this.events = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
  private getExperiencesStudentJobs() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref
            .where('uid', '==', this.user.uid)
            .where('type', '==', 'student-job')
        )
        .subscribe(x => {
          this.studentJobs = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
  private getExperiencesInternships() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref
            .where('uid', '==', this.user.uid)
            .where('type', '==', 'internship')
        )
        .subscribe(x => {
          this.internships = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
  private getExperiencesVolunteer() {
    if (this.user) {
      this.fs
        .getFiltredCollection('experiences', ref =>
          ref
            .where('uid', '==', this.user.uid)
            .where('type', '==', 'volunteer-work')
        )
        .subscribe(x => {
          this.volunteerWorks = (x as Experience[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
}
