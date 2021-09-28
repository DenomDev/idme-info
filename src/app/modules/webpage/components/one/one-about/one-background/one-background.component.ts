import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-background',
  templateUrl: './one-background.component.html',
  styleUrls: ['./one-background.component.scss']
})
export class OneBackgroundComponent {
  @Input() user: any;
}
