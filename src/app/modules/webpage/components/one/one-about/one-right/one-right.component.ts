import { Component, Input } from '@angular/core';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-one-right',
  templateUrl: './one-right.component.html',
  styleUrls: [
    './one-right.component.scss',
    '../../../../../../modules/shared/styles/cards/card-xp.scss'
  ]
})
export class OneRightComponent {
  step = 5;
  @Input() user: User;
  setStep(index: number) {
    this.step = index;
  }
}
