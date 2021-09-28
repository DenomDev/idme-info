import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: [
    './right.component.scss',
    '../../../../../modules/shared/styles/cards/card-xp.scss'
  ]
})
export class RightComponent {
  step = 5;
  @Input() user: User;

  setStep(index: number) {
    this.step = index;
  }
}
