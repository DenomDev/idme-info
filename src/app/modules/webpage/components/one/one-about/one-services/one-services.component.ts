import { Component, Input } from '@angular/core';
import { Service } from 'app/models/service.model';

@Component({
  selector: 'app-one-services',
  templateUrl: './one-services.component.html'
})
export class OneServicesComponent {
  @Input() services: Service[];
  constructor() {}
}
