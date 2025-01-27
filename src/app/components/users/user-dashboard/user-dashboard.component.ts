import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CreateUserModalComponent } from '../../create-user-modal/create-user-modal.component';
import { IUser } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { delay, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [CreateUserModalComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  private userService = inject(UsersService);
  users: IUser[] = [];
  isModalOpen: boolean = false;

  constructor(private toasterService: ToastrService) { }

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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    var lastItemsLength: number = this.users.length;
    var ItemsLength: number = this.users.length;
    
    of(null).pipe(
      delay(1500),
      switchMap(() => this.userService.getAllUsers())
    ).subscribe(users => {
      ItemsLength = users.length;
      if (ItemsLength === lastItemsLength + 1) {
        this.toasterService.success('Usuario creado exitosamente');
        this.users = users;
      }
    });
  }
}
