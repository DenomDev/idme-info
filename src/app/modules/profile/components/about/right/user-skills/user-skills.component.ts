import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'app/models/skill.model';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html'
})
export class UserSkillsComponent implements OnInit {
  @Input() user: User;
  skills: Skill[];
  allSkills: Skill[];
  loaded: boolean;
  constructor(private auth: AuthService, private fs: FirestoreService) {}
  ngOnInit(): void {
    this.fs.getCollection('skills').subscribe(s => {
      this.allSkills = s as any;
      this.skills = this.user.skills;
      this.loaded = true;
    });
  }

  async addSkill(name) {
    const existsInUser = this.skills.some(x => x.name === name);
    if (existsInUser) {
    } else {
      let existsInGlobal;
      this.allSkills.some(x => {
        if (x.name === name) {
          const sk = {
            id: x.id,
            name
          };
          this.skills.push(sk);
          existsInGlobal = true;
          this.updateSkills();
        }
      });
      if (!existsInGlobal) {
        this.fs.createDocument('skills', { name }).then(s => {
          const sk = {
            id: (s as any).id,
            name
          };
          this.skills.push(sk);
          this.updateSkills();
        });
      }
    }
  }
  updateSkills() {
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      skills: this.skills
    });
  }
  async onInput(event) {
    if ((event || '').trim()) {
      await this.addSkill(event);
    }
  }
  async onSelect(event) {
    this.allSkills.some(x => {
      if (x.name === event) {
        this.skills.push(x);
        this.updateSkills();
      }
    });
  }

  onRemove(event) {
    const index = this.skills.indexOf(event);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.updateSkills();
    }
  }
}
