import { Component, OnInit, Input } from '@angular/core';
import { Specialization } from 'app/models/specialization.model';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-specializations',
  templateUrl: './user-specializations.component.html'
})
export class UserSpecializationsComponent implements OnInit {
  @Input() user: User;
  specializations: Specialization[];
  allSpecializations: Specialization[];
  loaded: boolean;
  constructor(private auth: AuthService, private fs: FirestoreService) {}
  ngOnInit(): void {
    this.fs.getCollection('specializations').subscribe(s => {
      this.allSpecializations = s as any;
      this.specializations = this.user.specializations;
      this.loaded = true;
    });
  }

  async addSpecialization(name) {
    const existsInUser = this.specializations.some(x => x.name === name);
    if (existsInUser) {
    } else {
      let existsInGlobal;
      this.allSpecializations.some(x => {
        if (x.name === name) {
          const sk = {
            id: x.id,
            name
          };
          this.specializations.push(sk);
          existsInGlobal = true;
          this.updateSpecializations();
        }
      });
      if (!existsInGlobal) {
        this.fs.createDocument('specializations', { name }).then(s => {
          const sk = {
            id: (s as any).id,
            name
          };
          this.specializations.push(sk);
          this.updateSpecializations();
        });
      }
    }
  }
  updateSpecializations() {
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      specializations: this.specializations
    });
  }
  async onInput(event) {
    if ((event || '').trim()) {
      await this.addSpecialization(event);
    }
  }
  async onSelect(event) {
    this.allSpecializations.some(x => {
      if (x.name === event) {
        this.specializations.push(x);
        this.updateSpecializations();
      }
    });
  }

  onRemove(event) {
    const index = this.specializations.indexOf(event);
    if (index >= 0) {
      this.specializations.splice(index, 1);
      this.updateSpecializations();
    }
  }
}
