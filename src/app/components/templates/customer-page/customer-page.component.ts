import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from '../../organisms/customer-list/customer-list.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { HeadingComponent } from '../../atoms/heading/heading.component';
import { ModalComponent } from '../../atoms/modal/modal.component';
import { CustomerFormModalComponent } from '../../molecules/customer-form-modal/customer-form-modal.component';
import {
  ICustomerResponse,
  ICreateCustomerRequest,
} from '../../../services/customer/interfaces/customer-interface';
import { ListCustomersService } from '../../../services/customer/list-customers.service';
import { CreateCustomerService } from '../../../services/customer/create-customer.service';
import { UpdateCustomerService } from '../../../services/customer/update-customer.service';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    ButtonComponent,
    CustomerListComponent,
    ModalComponent,
    CustomerFormModalComponent,
  ],
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss'],
})
export class CustomerPageComponent implements OnInit {
  customers: ICustomerResponse[] = [];
  isModalOpen = false;
  selectedCustomerId?: number; // Gestión central del ID seleccionado
  selectedCustomer?: ICustomerResponse;

  listCustomersService = inject(ListCustomersService);
  createCustomerService = inject(CreateCustomerService);
  updateCustomerService = inject(UpdateCustomerService);

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.listCustomersService.execute().subscribe({
      next: (response) => (this.customers = response),
      error: (error) => console.error('Error al obtener los clientes:', error),
    });
  }

  openCreateCustomerModal() {
    this.selectedCustomerId = undefined;
    this.selectedCustomer = undefined;
    this.isModalOpen = true;
  }

  openEditCustomerModal(customerId: number) {
    this.selectedCustomerId = customerId;
    this.selectedCustomer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (!this.selectedCustomer) {
      console.error('Customer not found');
      return;
    }
    this.isModalOpen = true;
  }

  closeCustomerModal() {
    this.isModalOpen = false;
    this.selectedCustomerId = undefined;
    this.selectedCustomer = undefined;
    this.fetchCustomers();
  }

  createCustomer(customer: ICreateCustomerRequest) {
    this.createCustomerService.execute(customer).subscribe({
      next: () => this.closeCustomerModal(),
      error: (error) => console.error('Error al crear el cliente:', error),
    });
  }

  updateCustomer(customer: ICreateCustomerRequest) {
    if (this.selectedCustomerId) {
      this.updateCustomerService
        .execute(this.selectedCustomerId, customer)
        .subscribe({
          next: () => this.closeCustomerModal(),
          error: (error) =>
            console.error('Error al actualizar el cliente:', error),
        });
    } else {
      console.error('Selected customer ID is undefined');
    }
  }

  onEditCustomer(customerId: number) {
    this.openEditCustomerModal(customerId);
  }
}
