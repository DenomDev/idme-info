import { Component, OnInit, Input } from '@angular/core';
import { Experience } from 'app/models/experience.model';
import { FirestoreService } from '../../../../../services/firestore.service';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-one-experiences',
  templateUrl: './one-experiences.component.html',
  styleUrls: ['./one-experiences.component.scss']
})
export class OneExperiencesComponent implements OnInit {
  jobs: Experience[];
  projects: Experience[];
  events: Experience[];
  studentJobs: Experience[];
  internships: Experience[];
  volunteerWorks: Experience[];
  @Input() user: User;

  constructor(private fs: FirestoreService) {}

  ngOnInit() {
    this.getExperiencesJobs();
    this.getExperiencesProjects();
    this.getExperiencesEvents();
    this.getExperiencesStudentJobs();
    this.getExperiencesInternships();
    this.getExperiencesVolunteer();
  }
  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
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
