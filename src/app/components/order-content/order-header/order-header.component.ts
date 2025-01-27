import { Component, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { IOrderResponseDto } from '../../../interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-order-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent {
  customerName: string = '';
  orderStatus: string = '';

  @Output() orderAdded = new EventEmitter<IOrderResponseDto>();

  constructor(private orderService: OrderService) {}

  addOrderToAPI() {
  //   if (this.customerName.trim() && this.orderStatus.trim()) {
  //     const newOrder: IOrderResponseDto = {
  //       idOrder: null, 
  //       customerName: this.customerName.trim(),
  //       items: [],
  //     };
  
  //     this.orderService.addOrder(newOrder).subscribe({
  //       next: response => {
  //         console.log('Order added successfully:', response);
  //         this.orderAdded.emit(response);
  //       },
  //       error: error => {
  //         console.error('Error adding order:', error);
  //       }
  //     });
  //   } else {
  //     alert('Por favor, ingresa todos los campos.');
  //   }
  }
}
