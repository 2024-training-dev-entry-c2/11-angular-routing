import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessages: { [key: string]: string } = {};

  get hasError(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

  get errorMessage(): string {
    if (!this.hasError) return '';
    const firstErrorKey = Object.keys(this.control.errors || {})[0];
    return this.errorMessages[firstErrorKey] || 'Error desconocido';
  }
}