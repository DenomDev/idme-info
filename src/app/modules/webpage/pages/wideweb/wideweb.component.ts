import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { FormControl } from '@angular/forms';
import { FirestoreService } from 'app/services/firestore.service';
import { Education } from 'app/models/education.model';
import { Experience } from 'app/models/experience.model';

@Component({
  selector: 'app-wideweb',
  templateUrl: './wideweb.component.html',
  styleUrls: ['./wideweb.component.scss']
})
export class WidewebComponent implements OnInit {
  tabLinks: any;
  educations: Education[];

  selected = new FormControl(0);
  username: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fs: FirestoreService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.auth.getUserDataFromUsername(this.username).subscribe(u => {
        if (u !== null) {
          if (u[0] !== null && u.length === 1) {
            this.user = u[0];
            this.getEducations();
            // this.getExperiences();
          } else {
            this.router.navigateByUrl('/profile');
          }
        }
      });
    });
  }
  private getEducations() {
    if (this.user) {
      this.fs
        .getFiltredCollection('educations', ref =>
          ref.where('uid', '==', this.user.uid)
        )

        .subscribe(x => {
          this.educations = (x as Education[]).sort((a, b) => {
            const dateA = this.getTime(new Date(a.startDate));
            const dateB = this.getTime(new Date(b.startDate));
            return dateB - dateA;
          });
        });
    }
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
