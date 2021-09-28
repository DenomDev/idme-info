import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-about',
  templateUrl: './one-about.component.html'
})
export class OneAboutComponent {
  @Input() user: any;
}
