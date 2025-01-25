import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-section-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './main-section-orders.component.html',
  styleUrl: './main-section-orders.component.scss'
})
export class MainSectionOrdersComponent {
 public data: any;
  public orderData = input<any>();
  public tableContent= input<string[]>();

}
