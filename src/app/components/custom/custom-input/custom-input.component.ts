import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  imports: [ReactiveFormsModule],
})
export class CustomInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() config!: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    errorMessage?: string;
  };

  get control(): FormControl | FormArray {
    return this.formGroup.get(this.config.name) as FormControl | FormArray;
  }

  get isArray(): boolean {
    return this.control instanceof FormArray;
  }

  addItem(): void {
    if (this.control instanceof FormArray) {
      this.control.push(new FormControl('', Validators.required));
    }
  }

  removeItem(index: number): void {
    if (this.control instanceof FormArray) {
      this.control.removeAt(index);
    }
  }

  getFormArrayControls(control: FormControl | FormArray): FormControl[] {
    return (control as FormArray).controls as FormControl[];
  }
}
