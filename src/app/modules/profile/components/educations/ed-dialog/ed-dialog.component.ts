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
  FormControl
} from '@angular/forms';
import { Skill } from 'app/models/skill.model';
import { Education } from 'app/models/education.model';
import { AuthService } from 'app/services/auth.service';
import { EducationService } from 'app/services/education.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FirestoreService } from 'app/services/firestore.service';
@Component({
  selector: 'app-ed-dialog',
  templateUrl: './ed-dialog.component.html',
  styleUrls: ['../../../../../modules/shared/styles/dialogs/dialog.scss']
})
export class EdDialogComponent implements OnInit {
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
  education: Education;
  @Output() submited = new EventEmitter<boolean>();

  xpForm: FormGroup;
  types = [
    { value: 'certification', viewValue: 'Certification', selected: false },
    { value: 'high-school', viewValue: 'High School', selected: false },
    { value: 'bachelor', viewValue: 'Bachelor', selected: false },
    { value: 'master', viewValue: 'Master', selected: false },
    { value: 'doctor', viewValue: 'Doctor', selected: false }
  ];
  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    private fs: FirestoreService,
    private auth: AuthService,
    private xps: EducationService,
    public dialogRef: MatDialogRef<EdDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.education = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (!this.education) {
      return;
    }
    this.fs.getCollection('skills').subscribe(s => (this.allSkills = s as any));

    this.fs.getDocument('users', this.auth.getLocalUserId()).subscribe(u => {
      this.userSkills = (u as any).skills as Skill[];
    });
    if (!this.education.skills) {
      this.skills = [];
    } else {
      this.skills = this.education.skills;
    }

    this.xpForm = this.fb.group({
      name: [this.education.name, [Validators.required]],
      type: [this.education.type, [Validators.required]],
      institution: [this.education.institution, [Validators.required]],
      location: [this.education.location, [Validators.required]],
      hasDate: [this.education.hasDate, []],
      current: [this.education.current, []],
      startDate: [this.education.startDate, []],
      endDate: [this.education.endDate, []],
      description: [this.education.description, []]
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
  //#endregion

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  async addSkillByName(name) {
    let sk;
    const existsInEducation = this.skills.some(x => {
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
    if (!existsInEducation) {
      this.skills.push(sk);
    }
  }
  async addSkillToUser(skill) {
    this.userSkills.push(skill);
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      skills: this.userSkills
    });
  }
  async submitHandler() {
    if (!this.xpForm.valid) {
      return false;
    }
    this.loading = true;

    const formValue = this.xpForm.value;
    try {
      if (!this.education.id) {
        this.education = {
          uid: this.auth.getLocalUserId(),
          ...formValue,
          skills: this.skills
        } as Education;

        await this.xps.createEducation(this.education).then(x => {
          this.success = true;
          this.submited.emit();
          this.onNoClick();
        });
      } else {
        await this.xps
          .updateEducation(this.education.id, {
            ...formValue,
            skills: this.skills
          } as Education)
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
