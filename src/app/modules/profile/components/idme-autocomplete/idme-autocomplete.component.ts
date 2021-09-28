import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import {} from 'events';

@Component({
  selector: 'app-idme-autocomplete',
  templateUrl: './idme-autocomplete.component.html',
  styleUrls: ['./idme-autocomplete.component.scss']
})
export class IdmeAutocompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  suggestionCtrl = new FormControl();
  filteredSuggestions: Observable<any>;
  @Input() label: 'Items';
  @Input() placeholder: 'New item';
  @Input() suggestions: any;
  @Input() allSuggestions: any;

  @ViewChild('suggestionInput', { static: false }) suggestionInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @Output() inputValue = new EventEmitter<any>();
  @Output() selectValue = new EventEmitter<any>();
  @Output() removeValue = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {
    this.filteredSuggestions = this.suggestionCtrl.valueChanges.pipe(
      startWith(null as string),
      map((suggestion: string | null) =>
        suggestion ? this._filter(suggestion) : null
      )
    );
  }
  async add(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      this.inputValue.emit(value);

      this.suggestionInput.nativeElement.value = '';
      this.suggestionCtrl.setValue(null);
      if (input) {
        input.value = '';
      }
    }
  }

  remove(event: any): void {
    this.removeValue.emit(event);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectValue.emit(event.option.viewValue);
    this.suggestionInput.nativeElement.value = '';
    this.suggestionCtrl.setValue(null);
  }

  private _filter(value: string): any[] {
    let filterValue;
    if ((value as any).name != null) {
      filterValue = (value as any).name.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }

    if (filterValue.length > 1 && this.allSuggestions.length > 0) {
      return this.allSuggestions.filter(s => {
        return s.name.toLowerCase().indexOf(filterValue) === 0;
      });
    } else {
      return null;
    }
  }
}
