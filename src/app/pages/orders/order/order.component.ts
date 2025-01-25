import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { TableComponent } from '../../../components/table/table.component';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../interfaces/order.interface';

@Component({
  selector: 'app-order',
  imports: [TabsComponent, TableComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  tabsList = [
    {
      title: 'Add Order',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];

  ngOnInit(): void {
    console.log(this.tabsList);
    this.getOders();
  }
  public orderData: Order | any;

  public orders = inject(OrderService);
  getOders(): void {
    this.orders.getOrders().subscribe({
      next: (data: any[]) => {
        const transformedData = data.map((order) => ({
          id: order.id,
          nameClient: order.client.name,
          localDate: order.localDate,
          dishCount: order.dishfoodIds.length, 
        }));
        this.orderData= transformedData;
        console.log(transformedData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateOrder($event: number) {
    console.log($event);
  }
  
  deleteOrder($event: number) {
    this.orders.deleteOrder($event).subscribe({
      next: (data) => {
        this.getOders();
        alert('Order deleted');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
