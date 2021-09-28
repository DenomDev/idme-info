import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-socials',
  templateUrl: './one-socials.component.html',
  styleUrls: ['./one-socials.component.scss']
})
export class OneSocialsComponent {
  @Input() socials: any;
  constructor() {}
}
