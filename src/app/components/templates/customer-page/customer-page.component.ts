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
  selectedCustomer?: ICustomerResponse;
  listCustomersService = inject(ListCustomersService);
  createCustomerService = inject(CreateCustomerService);

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
    this.selectedCustomer = undefined;
    this.isModalOpen = true;
  }

  openEditCustomerModal(customer: ICustomerResponse) {
    this.selectedCustomer = customer;
    this.isModalOpen = true;
  }

  closeCustomerModal() {
    this.isModalOpen = false;
    this.fetchCustomers();
  }

  createCustomer(customer: ICreateCustomerRequest) {
    this.createCustomerService.execute(customer).subscribe({
      next: () => {
        this.closeCustomerModal();
      },
      error: (error) => console.error('Error al crear el cliente:', error),
    });
  }

  onEditCustomer(customer: ICustomerResponse) {
    this.openEditCustomerModal(customer);
  }
}
