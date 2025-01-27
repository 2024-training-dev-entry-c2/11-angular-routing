import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCardComponent } from '../../molecules/customer-card/customer-card.component';
import { ICustomerResponse } from '../../../services/customer/interfaces/customer-interface';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, CustomerCardComponent],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @Input() customers: ICustomerResponse[] = [];
  @Output() editCustomer = new EventEmitter<ICustomerResponse>();

  onEditCustomer(customer: ICustomerResponse) {
    this.editCustomer.emit(customer);
  }
}