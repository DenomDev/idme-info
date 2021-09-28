import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routes';
import { ProfilePage } from './pages/profile/profile.page';
import { MaterialModule } from '../material/material.module';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { SharedModule } from '../shared/shared.module';
import { EducationsComponent } from './components/educations/educations.component';
import { XpComponent } from './components/experiences/xp/xp.component';
import { EdComponent } from './components/educations/ed/ed.component';
import { AboutComponent } from './components/about/about.component';
import { BackgroundComponent } from './components/about/left/background/background.component';
import { XpDialogComponent } from './components/experiences/xp-dialog/xp-dialog.component';
import { EdDialogComponent } from './components/educations/ed-dialog/ed-dialog.component';
import { RightComponent } from './components/about/right/right.component';
import { UserSpecializationsComponent } from './components/about/right/user-specializations/user-specializations.component';
import { UserServicesComponent } from './components/about/right/user-services/user-services.component';
import { UserLanguagesComponent } from './components/about/right/user-languages/user-languages.component';
import { IdmeAutocompleteComponent } from './components/idme-autocomplete/idme-autocomplete.component';
import { UserSkillsComponent } from './components/about/right/user-skills/user-skills.component';
import { LeftComponent } from './components/about/left/left.component';
import { IdComponent } from './components/about/left/id/id.component';
import { SocialComponent } from './components/about/left/id/social/social.component';
import { IdDialogComponent } from './components/about/left/id/id-dialog/id-dialog.component';
import { SocialDialogComponent } from './components/about/left/id/social-dialog/social-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProfilePage,
    ExperiencesComponent,
    EducationsComponent,
    XpComponent,
    EdComponent,
    IdComponent,
    SocialComponent,
    AboutComponent,
    BackgroundComponent,
    IdDialogComponent,
    SocialDialogComponent,
    XpDialogComponent,
    EdDialogComponent,
    IdmeAutocompleteComponent,
    UserSpecializationsComponent,
    UserServicesComponent,
    UserLanguagesComponent,
    UserSkillsComponent,
    RightComponent,
    RightComponent,
    LeftComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  entryComponents: [
    IdDialogComponent,
    SocialDialogComponent,
    XpDialogComponent,
    EdDialogComponent
  ]
})
export class ProfileModule {}
