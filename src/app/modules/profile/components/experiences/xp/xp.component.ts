import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Experience } from 'app/models/experience.model';
import { FirestoreService } from 'app/services/firestore.service';

@Component({
  selector: 'app-xp',
  templateUrl: './xp.component.html',
  styleUrls: ['../../../../../modules/shared/styles/cards/card-xp.scss']
})
export class XpComponent {
  @Input() obj;
  @Output() editXp = new EventEmitter<Experience>();
  constructor(private fs: FirestoreService) {}
  edit() {
    this.editXp.emit(this.obj);
  }
  delete() {
    this.fs.deleteDocument('experiences', this.obj.id);
  }
}
