import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatAutocomplete
} from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Skill } from 'app/models/skill.model';
import { Experience } from 'app/models/experience.model';
import { AuthService } from 'app/services/auth.service';
import { ExperienceService } from 'app/services/experience.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FirestoreService } from 'app/services/firestore.service';
@Component({
  selector: 'app-xp-dialog',
  templateUrl: './xp-dialog.component.html',
  styleUrls: ['../../../../../modules/shared/styles/dialogs/dialog.scss']
})
export class XpDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<any>;
  allSkills: Skill[] = [];
  skills: Skill[] = [];
  loading = false;
  success = false;
  userSkills: Skill[];
  experience: Experience;
  @Output() submited = new EventEmitter<boolean>();

  xpForm: FormGroup;
  types = [
    { value: 'job', viewValue: 'Job', selected: false },
    { value: 'project', viewValue: 'Project', selected: false },
    { value: 'event', viewValue: 'Event', selected: false },
    { value: 'student-job', viewValue: 'Student job', selected: false },
    { value: 'internship', viewValue: 'Internship', selected: false },
    { value: 'volunteer-work', viewValue: 'Volunteer work', selected: false }
  ];
  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private fs: FirestoreService,
    private auth: AuthService,
    private xps: ExperienceService,
    public dialogRef: MatDialogRef<XpDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.experience = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (!this.experience) {
      return;
    }
    this.fs.getCollection('skills').subscribe(s => (this.allSkills = s as any));

    this.fs.getDocument('users', this.auth.getLocalUserId()).subscribe(u => {
      this.userSkills = (u as any).skills as Skill[];
    });
    if (!this.experience.skills) {
      this.skills = [];
    } else {
      this.skills = this.experience.skills;
    }
    if (!this.experience.links) {
      this.experience.links = [];
    }

    this.xpForm = this.fb.group({
      name: [this.experience.name, [Validators.required]],
      type: [this.experience.type, [Validators.required]],
      company: [this.experience.company, [Validators.required]],
      location: [this.experience.location],
      hasDate: [this.experience.hasDate, []],
      current: [this.experience.current, []],
      startDate: [this.experience.startDate, []],
      endDate: [this.experience.endDate, []],
      description: [this.experience.description, []],
      links: this.fb.array(this.experience.links, [])
    });
  }

  //#region form getters
  get email() {
    return this.xpForm.get('email');
  }
  get type() {
    return this.xpForm.get('type');
  }
  get institution() {
    return this.xpForm.get('company');
  }
  get location() {
    return this.xpForm.get('location');
  }
  get hasDate() {
    return this.xpForm.get('hasDate');
  }
  get current() {
    return this.xpForm.get('current');
  }
  get startDate() {
    return this.xpForm.get('startDate');
  }
  get endDate() {
    return this.xpForm.get('endDate');
  }
  get description() {
    return this.xpForm.get('description');
  }
  get linksForms() {
    return this.xpForm.get('links') as FormArray;
  }
  //#endregion

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  async addSkillByName(name) {
    let sk;
    const existsInExperience = this.skills.some(x => {
      sk = x;
      return x.name === name;
    });
    const existsInUser = this.userSkills.some(x => {
      sk = x;
      return x.name === name;
    });
    const existsInGlobal = this.allSkills.some(x => {
      sk = x;
      return x.name === name;
    });

    if (!existsInGlobal) {
      await this.fs.createDocument('skills', { name }).then(s => {
        sk = {
          id: (s as any).id,
          name
        };
      });
    }
    if (!existsInUser) {
      this.addSkillToUser(sk);
    }
    if (!existsInExperience) {
      this.skills.push(sk);
    }
  }
  async addSkillToUser(skill) {
    this.userSkills.push(skill);
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      skills: this.userSkills
    });
  }
  async addLink(url, name, desc) {
    const lk = this.fb.group({
      url,
      name,
      desc
    });

    this.linksForms.push(lk);
  }
  deleteLink(i) {
    this.linksForms.removeAt(i);
  }
  async submitHandler() {
    if (!this.xpForm.valid) {
      return false;
    }
    this.loading = true;

    const formValue = this.xpForm.value;
    try {
      if (!this.experience.id) {
        this.experience = {
          uid: this.auth.getLocalUserId(),
          ...formValue,
          skills: this.skills
        } as Experience;

        await this.xps.createExperience(this.experience).then(x => {
          this.success = true;
          this.submited.emit();
          this.onNoClick();
        });
      } else {
        await this.xps
          .updateExperience(this.experience.id, {
            ...formValue,
            skills: this.skills
          } as Experience)
          .then(x => {
            this.success = true;
            this.submited.emit();
            this.onNoClick();
          });
      }
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  }

  async onInput(event) {
    if ((event || '').trim()) {
      await this.addSkillByName(event);
    }
  }
  async onSelect(event) {
    await this.addSkillByName(event);
  }

  async onRemove(event) {
    await this.remove(event);
  }
}
