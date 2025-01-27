import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account-modal.component.html',
  styleUrl: './create-account-modal.component.scss'
})
export class CreateAccountModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  public createAccountForm: FormGroup;
  private accountService = inject(AccountsService);
  private userService = inject(UsersService);
  users: IUser[] = [];

  constructor(private fb: FormBuilder) {
    this.createAccountForm = this.fb.group({
      userId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  onCreateAccount() {
    if (this.createAccountForm.valid) {
      this.accountService.createAccount(this.createAccountForm.value).subscribe({
        next: (response) => {
          console.log('Cuenta creada exitosamente', response);
        },
        error: (error) => {
          console.error('Error al crear cuenta', error);
        },
        complete: () => {
          this.close(true);
        }
      })
    }
  }

  close(value: boolean) {
    this.closeModal.emit(value);
  }
}
