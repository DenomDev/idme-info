import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoaderSquareComponent } from './components/loader-square/loader-square.component';
import { NavComponent } from './components/nav/nav.component';
import { NavLogoComponent } from './components/nav/nav-logo/nav-logo.component';
import { LoaderTriComponent } from './components/loader-tri/loader-tri.component';
import { IdmeLogoComponent } from './components/idme-logo/idme-logo.component';

const modules = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [
    LoaderSquareComponent,
    NavComponent,
    NavLogoComponent,
    LoaderTriComponent,
    IdmeLogoComponent
  ],
  imports: [CommonModule, ...modules, MaterialModule],
  exports: [
    ...modules,
    NavComponent,
    NavLogoComponent,
    LoaderSquareComponent,
    LoaderTriComponent
  ]
})
export class SharedModule {}
