import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() config!: {
    name: string;
    label: string;
    type?: string;
    options?: { label: string; value: any }[];
    placeholder?: string;
    errorMessage?: string;
  };


  get isArray(): boolean {
    return this.control instanceof FormArray;
  }

  get control(): FormControl | FormArray {
    return this.formGroup.get(this.config.name) as FormControl | FormArray;
  }

  addItem(value: any): void {
    if (this.control instanceof FormArray) {
      this.control.push(new FormControl(value, Validators.required));
    }
  }

  getFormArrayControls(control: FormControl | FormArray): FormControl[] {
    return (control as FormArray).controls as FormControl[];
  }
}
