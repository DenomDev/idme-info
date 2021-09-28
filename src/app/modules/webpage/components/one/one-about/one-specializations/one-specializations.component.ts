import { Component, Input } from '@angular/core';
import { Specialization } from 'app/models/specialization.model';

@Component({
  selector: 'app-one-specializations',
  templateUrl: './one-specializations.component.html'
})
export class OneSpecializationsComponent {
  @Input() specializations: Specialization[];
  constructor() {}
}
