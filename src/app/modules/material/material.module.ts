import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatChipsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatIconModule,
  MatAutocompleteModule,
  MatInputModule,
  MatRippleModule,
  MatListModule,
  MatMenuModule,
  MatCommonModule,
  MatButtonModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule
} from '@angular/material';

const matModules = [
  MatChipsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatListModule,
  MatMenuModule,
  MatCommonModule,
  MatButtonModule,
  MatTabsModule,
  MatExpansionModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...matModules],
  exports: [...matModules]
})
export class MaterialModule {}
