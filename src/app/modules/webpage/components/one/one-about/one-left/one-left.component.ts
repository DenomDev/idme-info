import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-left',
  templateUrl: './one-left.component.html',
  styleUrls: ['./one-left.component.scss']
})
export class OneLeftComponent {
  @Input() user;
}
