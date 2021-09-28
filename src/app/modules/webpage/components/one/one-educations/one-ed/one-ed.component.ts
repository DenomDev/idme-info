import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-ed',
  templateUrl: './one-ed.component.html',
  styleUrls: ['../../../../../../modules/shared/styles/cards/card-xp.scss']
})
export class OneEdComponent {
  @Input() obj;
}
