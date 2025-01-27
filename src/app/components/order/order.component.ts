import { Component, ViewChild } from '@angular/core';
import { OrderHeaderComponent } from "../order-content/order-header/order-header.component";
import { SearchComponent } from "../search/search.component";
import { OrderMainComponent } from "../order-content/order-main/order-main.component";
import { IOrderResponseDto } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order',
  imports: [OrderHeaderComponent, SearchComponent, OrderMainComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
searchQuery: string = ''; 

  @ViewChild(OrderMainComponent) orderMainComponent!: OrderMainComponent;

  onSearchQueryChange(query: string): void {
    this.searchQuery = query; 
  }

  onOrderAdded(newOrder: IOrderResponseDto): void {
    this.orderMainComponent.addOrder(newOrder);
  }
}
