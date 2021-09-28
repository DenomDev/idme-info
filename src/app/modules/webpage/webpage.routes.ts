import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidewebComponent } from './pages/wideweb/wideweb.component';
import { OneAboutComponent } from './components/one/one-about/one-about.component';
import { OneExperiencesComponent } from './components/one/one-experiences/one-experiences.component';
import { OneEducationsComponent } from './components/one/one-educations/one-educations.component';

const routes: Routes = [
  {
    path: ':username',
    component: WidewebComponent,
    children: [
      { path: '', component: OneAboutComponent },
      { path: 'experiences', component: OneExperiencesComponent },
      { path: 'education', component: OneEducationsComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/profile'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebpageRoutingModule {}
