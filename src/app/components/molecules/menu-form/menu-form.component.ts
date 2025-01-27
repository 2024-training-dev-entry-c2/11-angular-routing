import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuForm } from '../../../interfaces/menu-interface';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent],
  styleUrls: ['./menu-form.component.scss'],
})
export class MenuFormComponent implements OnChanges {
  @Input() initialValues?: MenuForm;
  @Output() submitMenu = new EventEmitter<MenuForm>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(9)]],
      dishIds: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && this.initialValues) {
      this.form.patchValue({
        name: this.initialValues.name,
        description: this.initialValues.description,
        dishIds: this.initialValues.dishIds.join(', '),
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const menuForm: MenuForm = {
        name: formValue.name,
        description: formValue.description,
        dishIds: formValue.dishIds.split(',').map((id: string) => parseInt(id.trim(), 10)),
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