import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
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
}
