import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from './pages/profile/profile.page';
import { AboutComponent } from './components/about/about.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { EducationsComponent } from './components/educations/educations.component';
const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      { path: '', component: AboutComponent },
      { path: 'experiences', component: ExperiencesComponent },
      { path: 'education', component: EducationsComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
