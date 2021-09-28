import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'app/services/firestore.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-user-languages',
  templateUrl: './user-languages.component.html',
  styleUrls: ['./user-languages.component.scss']
})
export class UserLanguagesComponent implements OnInit {
  @Input() languages: any[];
  constructor(private fs: FirestoreService, private auth: AuthService) {}

  ngOnInit() {}
  getLanguageLabel(i: string): string {
    if (i === '1') {
      return 'Elementary';
    } else if (i === '2') {
      return 'Limited working';
    } else if (i === '3') {
      return 'Professional working';
    } else if (i === '4') {
      return 'Full professional';
    } else if (i === '5') {
      return 'Native or bilingual';
    }
  }

  async addLanguage(language, level) {
    this.languages.push({ language, level });
    this.updateLanguages();
  }

  remove(language: any): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      this.languages.splice(index, 1);
      this.updateLanguages();
    }
  }
  updateLanguages() {
    this.fs.updateDocument('users', this.auth.getLocalUserId(), {
      languages: this.languages
    });
  }
}
