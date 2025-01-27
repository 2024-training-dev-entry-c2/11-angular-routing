import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';

interface DishForm {
  name: string;
  price: number;
  menuId: number;
}

@Component({
  selector: 'app-dish-form',
  standalone: true,
  templateUrl: './dish-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent],
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent {
  @Input() initialValues?: DishForm;
  @Output() submitDish = new EventEmitter<DishForm>();
  form = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [5000, [Validators.required, Validators.min(0.01)]],
    menuId: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && this.initialValues) {
      this.form.patchValue({
        name: this.initialValues.name,
        price: this.initialValues.price,
        menuId: this.initialValues.menuId,
      });
    }
  }

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

  get menuIdControl(): FormControl {
    return this.form.get('menuId') as FormControl;
  }
}
