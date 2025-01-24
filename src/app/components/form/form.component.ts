import { Component, Input } from '@angular/core';
import { FormField } from '../../interfaces/form.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class InputComponent {
  @Input() formFields: FormField[] = [];
  @Input() formGroup!: FormGroup; 

}
