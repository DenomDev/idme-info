import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-one-id',
  templateUrl: './one-id.component.html',
  styleUrls: [
    '../../../../../../modules/shared/styles/cards/card.scss',
    './one-id.component.scss'
  ]
})
export class OneIdComponent {
  @Input() user: User;
  constructor() {}
}
