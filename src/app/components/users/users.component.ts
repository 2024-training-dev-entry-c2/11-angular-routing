import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserRequest, UserResponse } from '../../interfaces/user.interface';
import { CreateUserComponent } from './create-user/create-user.component';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-users',
  imports: [CreateUserComponent, SpinnerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users!: UserResponse[];
  isCreateModalOpen: boolean = false;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  onCreateUser(newUser: UserRequest): void {
    this.dataService.setLoading(true);
    this.userService
      .create(newUser)
      .pipe(finalize(() => this.dataService.setLoading(false)))
      .subscribe({
        next: (response) => this.users.push(response),
        error: () => {
          this.dataService.setErrorMessage('Error creating user');
          this.dataService.setError(true);
        },
      });
    this.closeCreateModal();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => (this.users = response),
        error: () => {
          this.dataService.setErrorMessage('Error loading users');
          this.dataService.setError(true);
        },
      });
  }
}
