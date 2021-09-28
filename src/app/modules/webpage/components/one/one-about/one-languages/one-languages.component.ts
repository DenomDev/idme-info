import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-languages',
  templateUrl: './one-languages.component.html',
  styleUrls: ['./one-languages.component.scss']
})
export class OneLanguagesComponent {
  @Input() languages: any[];
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
}
