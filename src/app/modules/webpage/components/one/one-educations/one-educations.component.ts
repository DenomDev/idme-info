import { Component, OnInit, Input } from '@angular/core';
import { Education } from 'app/models/education.model';
import { FirestoreService } from '../../../../../services/firestore.service';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-one-educations',
  templateUrl: './one-educations.component.html',
  styleUrls: ['./one-educations.component.scss']
})
export class OneEducationsComponent implements OnInit {
  @Input() user: User;
  doctors: Education[];
  masters: Education[];
  bachelors: Education[];
  highSchools: Education[];
  certifications: Education[];

  constructor(private fs: FirestoreService) {}
  ngOnInit() {
    this.getEducationsDoctors();
    this.getEducationsMasters();
    this.getEducationsBachelors();
    this.getEducationsHighSchools();
    this.getEducationsCertifications();
  }
  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
  private getEducationsDoctors() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'doctor')
        )
        .subscribe(x => {
          this.doctors = (x as Education[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }

  private getEducationsMasters() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'master')
        )
        .subscribe(x => {
          if (x) {
            this.masters = (x as Education[]).sort((a, b) => {
              const dateA = this.getTime(new Date(a.startDate));
              const dateB = this.getTime(new Date(b.startDate));
              return dateB - dateA;
            });
          }
        });
    }
  }

  private getEducationsBachelors() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref.where('uid', '==', this.user.uid).where('type', '==', 'bachelor')
        )
        .subscribe(x => {
          this.bachelors = (x as Education[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }

  private getEducationsHighSchools() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref
            .where('uid', '==', this.user.uid)
            .where('type', '==', 'high-school')
        )
        .subscribe(x => {
          this.highSchools = (x as Education[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }

  private getEducationsCertifications() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref
            .where('uid', '==', this.user.uid)
            .where('type', '==', 'certification')
        )
        .subscribe(x => {
          this.certifications = (x as Education[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }
}
