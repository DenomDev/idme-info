import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-xp',
  templateUrl: './one-xp.component.html',
  styleUrls: ['../../../../../../modules/shared/styles/cards/card-xp.scss']
})
export class OneXpComponent {
  @Input() obj;
}
