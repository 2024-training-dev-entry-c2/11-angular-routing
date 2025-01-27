import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { TableComponent } from '../../../components/table/table.component';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../interfaces/order.interface';
import { AddOrderComponent } from '../add-order/add-order.component';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { AddMenuComponent } from '../../menus/add-menu/add-menu.component';
import { map, timeout } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [
    TabsComponent,
    TableComponent,
    AddOrderComponent,
    UpdateOrderComponent,
  ],
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
  updateOrderData: Order | any;

  ngOnInit(): void {
    console.log(this.tabsList);
    this.getOders();
  }
  public orderData: Order | any;

  public orders = inject(OrderService);
  getOders(): void {
    this.orders.getOrders()
    .pipe(
      map((data: any[]) => 
        data.map(order => ({
          id: order.id,
          nameClient: order.client.name,
          localDate: order.localDate,
          dishCount: order.dishfoodIds,
          price: order.totalPrice,
        }))
      ),
    )
    .subscribe({
      next: (transformedData) => {
        this.orderData = transformedData;
      },
      error: (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    });
  }

  getOrder(id: number) {
    this.orders.getOrderId(id).subscribe({
      next: (data) => {
        this.updateOrderData = data;
        console.log(this.updateOrderData);

        this.showModal = true;
        this.getOders();
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  showModal = false;

  closeModal() {
    this.showModal = false;
    this.getOders();
  }
  updateOrderList() {
    setTimeout(() => {
      console.log("Actualizando lista de pedidos");
      this.getOders();
    }, 2000);
  }
}
