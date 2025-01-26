import { Component, inject, OnInit } from '@angular/core';
import { ListCustomersService } from '../services/list-customers.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { ICustomerResponse } from '../interfaces/customer.interface';
import { DeleteCardComponent } from '../../delete-card/delete-card.component';
import { DeleteCustomerService } from '../services/delete-customer.service';

@Component({
  selector: 'app-customer',
  imports: [FontAwesomeModule, FormCustomerComponent, DeleteCardComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  showSaveCustomer = false;
  showDeleteCustomer = false;

  private listCustomersService = inject(ListCustomersService);
  private deleteCustomerService = inject(DeleteCustomerService);

  customers: ICustomerResponse[] = [];
  selectedCustomer: ICustomerResponse | null = null;
  selectedIdCustomer!: number;

  ngOnInit(): void {
    this.listCustomersService.execute().subscribe((customers) => {
      this.customers = customers;
    });
  }

  showCreateCustomerModal(): void {
    this.showSaveCustomer = true;
  }

  showDeleteCustomerModal(idCustomer: number): void {
    this.selectedIdCustomer = idCustomer;
    this.showDeleteCustomer = true;
  }

  showUpdateCustomerModal(selectedCustomer: ICustomerResponse): void {
    this.selectedCustomer = selectedCustomer;
    if (this.selectedCustomer) {
      this.showSaveCustomer = true;
    }
  }

  closeCreateCustomerModal(): void {
    this.showSaveCustomer = false;
  }

  closeDeleteCustomerModal(): void {
    this.showDeleteCustomer = false;
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

  deleteCustomer(idCustomer: number): void {
    this.deleteCustomerService.execute(idCustomer).subscribe(() => {
      this.customers = this.customers.filter((c) => c.id !== idCustomer);
      this.showDeleteCustomer = false;
    });
  }
}
