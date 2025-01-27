import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRequest } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ButtonsComponent } from '../../form/buttons/buttons.component';
import { InputComponent } from '../../form/input/input.component';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ModalComponent,
    ButtonsComponent,
    InputComponent,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  close = output();
  create = output<UserRequest>();

  userForm: FormGroup;

  formErrors = {
    nameError: false,
    documentError: false,
  };

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      documentId: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onValueChange(value: keyof typeof this.formErrors) {
    this.formErrors[value] = false;
  }

  onSubmit(): void {
    this.formErrors.nameError = false;
    this.formErrors.documentError = false;

    if (this.userForm.valid) {
      this.create.emit(this.userForm.value);
    } else {
      if (this.userForm.get('name')?.invalid) {
        this.formErrors.nameError = true;
      }
      if (this.userForm.get('documentId')?.invalid) {
        this.formErrors.documentError = true;
      }
    }
  }

  getFormControl(value: string): FormControl {
    return this.userForm.get(value) as FormControl;
  }
}
