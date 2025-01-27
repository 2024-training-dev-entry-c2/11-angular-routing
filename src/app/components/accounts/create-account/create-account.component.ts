import { Component, OnInit, output } from '@angular/core';
import { AccountRequest } from '../../../interfaces/account.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserResponse } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ButtonsComponent } from '../../form/buttons/buttons.component';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent, ButtonsComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit {
  close = output();
  create = output<AccountRequest>();
  users!: UserResponse[];

  formError: boolean = false;
  accountForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.accountForm = this.fb.group({
      userId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.error('Error loading users:', error),
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onFalseError() {
    this.formError = false;
  }

  onSubmit(): void {
    this.onFalseError();
    if (this.accountForm.valid) {
      this.create.emit(this.accountForm.value);
    } else {
      this.formError = true;
    }
  }
}
