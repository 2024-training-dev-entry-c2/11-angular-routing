import { Component, inject, input } from '@angular/core';
import { MainSectionOrdersComponent } from "../main-section-orders/main-section-orders.component";
import { getOrderService } from '../../services/orders.service';

@Component({
  selector: 'app-section-orders-content',
  imports: [MainSectionOrdersComponent],
  templateUrl: './section-orders-content.component.html',
  styleUrl: './section-orders-content.component.scss'
})
export class SectionOrdersContentComponent {
data: any;
  public orderData = input<any>();

  public tableContent = {
    headers: ['Order ID', 'Order Date', 'Price', 'Menu ID', 'Client Id', 'Actions'],

  }


  private ordersService = inject(getOrderService);

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data); // For debugging purposes
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
