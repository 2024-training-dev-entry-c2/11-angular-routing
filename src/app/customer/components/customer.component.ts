import { Component, inject, OnInit } from '@angular/core';
import { ListCustomersService } from '../services/list-customers.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CreateCustomerComponent } from '../components/create-customer/create-customer.component';
import { ICustomerResponse } from '../interfaces/customer.interface';

@Component({
  selector: 'app-customer',
  imports: [FontAwesomeModule, CreateCustomerComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  showCreateCustomer = false;

  private listCustomersService = inject(ListCustomersService);

  customers: ICustomerResponse[] = [];

  ngOnInit(): void {
    this.listCustomersService.execute().subscribe((customers) => {
      this.customers = customers;
    });
  }

  showCreateCustomerModal(): void {
    this.showCreateCustomer = true;
  }

  closeCreateCustomerModal(): void {
    this.showCreateCustomer = false;
  }

  addCustomer(newCustomer: ICustomerResponse): void {
    this.customers = [...this.customers, newCustomer];
  }
}
