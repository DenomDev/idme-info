import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidewebComponent } from './pages/wideweb/wideweb.component';
import { WebpageRoutingModule } from './webpage.routes';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OneAboutComponent } from './components/one/one-about/one-about.component';
import { OneBackgroundComponent } from './components/one/one-about/one-background/one-background.component';
import { OneEdComponent } from './components/one/one-educations/one-ed/one-ed.component';
import { OneEducationsComponent } from './components/one/one-educations/one-educations.component';
import { OneExperiencesComponent } from './components/one/one-experiences/one-experiences.component';
import { OneIdComponent } from './components/one/one-about/one-id/one-id.component';
import { OneLeftComponent } from './components/one/one-about/one-left/one-left.component';
import { OneRightComponent } from './components/one/one-about/one-right/one-right.component';
import { OneSocialsComponent } from './components/one/one-about/one-socials/one-socials.component';
import { OneLanguagesComponent } from './components/one/one-about/one-languages/one-languages.component';
import { OneServicesComponent } from './components/one/one-about/one-services/one-services.component';
import { OneSkillsComponent } from './components/one/one-about/one-skills/one-skills.component';
import { OneSpecializationsComponent } from './components/one/one-about/one-specializations/one-specializations.component';
import { OneXpComponent } from './components/one/one-experiences/one-xp/one-xp.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizeService } from 'app/services/resize.service';

@NgModule({
  declarations: [
    WidewebComponent,
    OneAboutComponent,
    OneBackgroundComponent,
    OneEdComponent,
    OneEducationsComponent,
    OneExperiencesComponent,
    OneIdComponent,
    OneLeftComponent,
    OneRightComponent,
    OneSocialsComponent,
    OneLanguagesComponent,
    OneServicesComponent,
    OneSkillsComponent,
    OneSpecializationsComponent,
    OneXpComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [ResizeService, FlexLayoutModule]
})
export class WebpageModule {}
