import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Education } from 'app/models/education.model';
import { FirestoreService } from 'app/services/firestore.service';

@Component({
  selector: 'app-ed',
  templateUrl: './ed.component.html',
  styleUrls: ['../../../../../modules/shared/styles/cards/card-xp.scss']
})
export class EdComponent {
  @Input() obj;
  @Output() editEd = new EventEmitter<Education>();
  constructor(private fs: FirestoreService) {}
  edit() {
    this.editEd.emit(this.obj);
  }
  delete() {
    this.fs.deleteDocument('educations', this.obj.id);
  }
}
