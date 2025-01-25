import { Component, inject, OnInit } from '@angular/core';
import { ListCustomersService } from '../services/list-customers.service';
import { CreateCustomerService } from '../services/create-customer.service';
import { UpdateCustomerService } from '../services/update-customer.service';
import { DeleteCustomerService } from '../services/delete-customer.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  imports: [FontAwesomeModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  private listCustomersService = inject(ListCustomersService);
  private createCustomerService = inject(CreateCustomerService);
  private updateCustomerService = inject(UpdateCustomerService);
  private deleteCustomerService = inject(DeleteCustomerService);

  customers: any[] = [];

  ngOnInit(): void {
    this.listCustomersService.execute().subscribe((customers: any) => {
      this.customers = customers;
    });
  }
}
