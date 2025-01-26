import { Component, inject, OnInit } from '@angular/core';
import { ListCustomersService } from '../services/list-customers.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { ICustomerResponse } from '../interfaces/customer.interface';

@Component({
  selector: 'app-customer',
  imports: [FontAwesomeModule, FormCustomerComponent],
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
  selectedCustomer: ICustomerResponse | null = null;

  ngOnInit(): void {
    this.listCustomersService.execute().subscribe((customers) => {
      this.customers = customers;
    });
  }

  showCreateCustomerModal(): void {
    this.showCreateCustomer = true;
  }

  showUpdateCustomerModal(selectedCustomer: ICustomerResponse): void {
    this.selectedCustomer = selectedCustomer;
    if (this.selectedCustomer) {
      this.showCreateCustomer = true;
    }
  }

  closeCreateCustomerModal(): void {
    this.showCreateCustomer = false;
  }

  addCustomer(newCustomer: ICustomerResponse): void {
    this.customers = [...this.customers, newCustomer];
  }

  replaceCustomer(updatedCustomer: ICustomerResponse): void {
    const index = this.customers.findIndex((c) => c.id === updatedCustomer.id);
    if (index !== -1) {
      this.customers[index] = updatedCustomer;
    }
    this.selectedCustomer = null;
  }

  clearSelectedCustomer(): void {
    this.selectedCustomer = null;
  }
}
