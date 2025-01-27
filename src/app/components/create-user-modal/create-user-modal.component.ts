import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.scss'
})
export class CreateUserModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  public createUserForm: FormGroup;
  private userAccountService = inject(UsersService);

  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      documentId: ['', Validators.required]
    });
  }

  onCreateUser() {
    if (this.createUserForm.valid) {
      this.userAccountService.createUser(this.createUserForm.value).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente', response);
        },
        error: (error) => {
          console.error('Error al crear usuario', error);
        },
        complete: () => {
          this.close();
        }
      })
    }
  }

  close() {
    this.closeModal.emit();
  }
}
