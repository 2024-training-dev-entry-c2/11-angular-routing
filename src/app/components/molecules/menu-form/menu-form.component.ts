import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuForm } from '../../../interfaces/menu-interface';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  templateUrl: './menu-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent],
  styleUrls: ['./menu-form.component.scss'],
})
export class MenuFormComponent {
  @Output() submitMenu = new EventEmitter<MenuForm>();
  form = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(9)]],
    dishIds: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const menuForm: MenuForm = {
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        dishIds: (formValue.dishIds ?? '').split(',').map((id: string) => parseInt(id.trim(), 10)),
      };
      this.submitMenu.emit(menuForm);
      this.form.reset({ name: '', description: '', dishIds: '' });
    }
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get dishIdsControl(): FormControl {
    return this.form.get('dishIds') as FormControl;
  }
}
