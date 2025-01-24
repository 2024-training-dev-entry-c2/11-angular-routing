import { Component, OnInit } from '@angular/core';
import { GetAllCustomersService } from '../../../services/customer/get-all-customers.service';
import { ICustomer } from '../../../interfaces/customerResponse';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { RouterLink } from '@angular/router';
import { AddComponent } from '../../custom/add/add.component';
import { TitleComponent } from '../../custom/title/title.component';

@Component({
  selector: 'app-customer',
  imports: [CustomerCardComponent, RouterLink, AddComponent, TitleComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: ICustomer[] = [];
  title = 'Customers Management';
  addLink = '/customer/add';

  constructor(private getAllCustomersService: GetAllCustomersService) {}

  ngOnInit(): void {
    this.getAllCustomersService.execute().subscribe((data) => {
      this.customers = data;
    });
  }

  trackByFn(index: number, customer: ICustomer): number {
    return customer.id;
  }
}
