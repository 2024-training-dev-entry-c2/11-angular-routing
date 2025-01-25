import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetAllCustomersService } from '../../../services/customer/get-all-customers.service';
import { ICustomer } from '../../../interfaces/customerResponse.interface';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { AddComponent } from '../../custom/add/add.component';
import { TitleComponent } from '../../custom/title/title.component';
import { NoDataComponent } from '../../custom/no-data/no-data.component';

@Component({
  selector: 'app-customer',
  imports: [
    CustomerCardComponent,
    AddComponent,
    TitleComponent,
    NoDataComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, OnDestroy {
  customers: ICustomer[] = [];
  title = 'Customers';
  addLink = '/customer/add';
  private refreshSubscription!: Subscription;

  constructor(private getAllCustomersService: GetAllCustomersService) {}

  ngOnInit(): void {
    this.refreshSubscription = interval(100)
      .pipe(switchMap(() => this.getAllCustomersService.execute()))
      .subscribe({
        next: (data) => (this.customers = data),
        error: (err) => console.error('Error fetching customers:', err),
      });
  }

  trackByFn(index: number, customer: ICustomer): number {
    return customer.id;
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
