import { Component, Input } from '@angular/core';
import { Skill } from 'app/models/skill.model';

@Component({
  selector: 'app-one-skills',
  templateUrl: './one-skills.component.html'
})
export class OneSkillsComponent {
  @Input() skills: Skill[];
  constructor() {}
}
