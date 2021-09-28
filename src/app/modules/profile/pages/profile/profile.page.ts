import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EducationsComponent } from '../../components/educations/educations.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  user: any;
  selected = new FormControl(0);
  tabLinks = [
    { name: 'About', icon: 'face', path: '/profile' },
    { name: 'Experiences', icon: 'work', path: '/profile/experiences' },
    { name: 'Education', icon: 'book', path: '/profile/education' }
  ];
  activeLink = this.tabLinks[0];

  constructor() {
    switch (window.location.pathname) {
      case '/profile':
        this.activeLink = this.tabLinks[0];
        break;
      case '/profile/experiences':
        this.activeLink = this.tabLinks[1];
        break;
      case '/profile/education':
        this.activeLink = this.tabLinks[2];
        break;
      default:
        this.activeLink = this.tabLinks[0];
        break;
    }
  }

  handleFabClicked(
    experiences: ExperiencesComponent,
    educations: EducationsComponent
  ) {
    if (this.selected.value === 1) {
      experiences.openDialog();
    } else {
      educations.openDialog();
    }
  }
}
