import { Component, Input } from '@angular/core';
import { ICustomer } from '../../../../interfaces/customerResponse';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
})
export class CustomerCardComponent {
  @Input() customer!: ICustomer;
}
