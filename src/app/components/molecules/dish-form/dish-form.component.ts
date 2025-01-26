import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';

interface DishForm {
  name: string;
  price: number;
}

@Component({
  selector: 'app-dish-form',
  standalone: true,
  templateUrl: './dish-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent],
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent {
  @Output() submitDish = new EventEmitter<DishForm>();
  form = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [5000, [Validators.required, Validators.min(0.01)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitDish.emit(this.form.value as DishForm);
      this.form.reset({ name: '', price: 5000 });
    }
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get priceControl(): FormControl {
    return this.form.get('price') as FormControl;
  }
}
