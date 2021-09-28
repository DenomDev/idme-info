import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRoutingModule } from './cv.routes';
import { CvComponent } from './pages/cv/cv.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [CvComponent],
  imports: [CommonModule, CvRoutingModule, SharedModule, MaterialModule]
})
export class CvModule {}
