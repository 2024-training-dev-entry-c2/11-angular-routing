import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { MinimalisticTableComponent } from '../../../../shared/components/minimalistic-table/minimalistic-table.component';
import { UserAccount } from '../../interfaces/user-account.interface';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MinimalisticTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  alertService = inject(AlertService);
  userService = inject(UserService);

  columns = ['Name', 'Document ID'];
  data: any[] = [];

  constructor(
    private fb: FormBuilder //private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      documentId: ['', Validators.required],
    });
    this.data = [
      { Name: 'John Doe', 'Document ID': 'DOC123' },
      { Name: 'Jane Smith', 'Document ID': 'DOC456' },
    ];
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.data = users.map((user) => ({
          Name: user.name,
          'Document ID': user.documentId,
        }));
      },
      error: () => {
        this.alertService.showAlert('Error loading users', 'error');
      },
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid) {

      const user: UserAccount = {
        name: this.userForm.value.name,
        documentId: this.userForm.value.documentId,
      };

      this.userService.createUser(user).subscribe({
        next: () => {
          this.alertService.showAlert(
            'User registered successfully',
            'success'
          );
          debugger;
          this.loadUsers();
          this.userForm.reset();
          this.submitted = false;
        },
        error: () => {
          this.alertService.showAlert('Registration failed', 'error');
        },
      });
      
    }

  }
}
