import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { IOrderItemResponseDto, IOrderResponseDto } from '../../../interfaces/order.interface';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss']
})
export class OrderMainComponent implements OnInit {
  orders: IOrderResponseDto[] = []; 
  filteredOrders: IOrderResponseDto[] = []; 
  modalType: string = '';
  orderStatus: string = '';
  totalAmount: number = 0;
  items: IOrderItemResponseDto[] = [];
  selectedOrderId: number | null = null;
  clientName: string = '';
  currentOrder: IOrderResponseDto = {} as IOrderResponseDto;

  @Input() searchQuery: string = ''

  actions = [
    { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  constructor(private orderService: OrderService, 
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders) => {
        this.orders = orders;
        this.filteredOrders = orders; 
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

   addOrder(newOrder: IOrderItemResponseDto): void {
      // this.orders.push(newOrder);
      this.filterOrders(); 
    }
  
    filterOrders(): void {
      if (this.searchQuery) {
        this.filteredOrders = this.orders.filter(order => 
          order.idOrder
        );
      } else {
        this.filteredOrders = this.orders;  
      }
    }

  getHeaders() {
    return [
      { label: 'Order ID' },
      { label: 'Customer Name' },
      { label: 'Precio total' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return this.actions;
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  openModal(modalTemplate: TemplateRef<any>, type: string, id: number): void {
    this.modalType = type;
    this.loadOrderDetails(id);

    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: type === 'edit' ? 'Editar Orden' : 'Eliminar Orden',
        buttonName: 'Confirmar',
      })
      .subscribe(() => {
        if (type === 'edit') {
          this.updateOrder(id);
        } else if (type === 'delete') {
          this.deleteOrder(id);
        }
      });
  }

  loadOrderDetails(id: number): void {
    this.orderService.getOrder(id).subscribe(
      (order) => {
        this.currentOrder = order;
        this.clientName = order.clientName;
      },
      (error) => {
        console.error('Error loading order details', error);
      }
    );
  }

  updateOrder(id: number): void {
    const updatedOrder: IOrderResponseDto = {
      ...this.currentOrder,
      clientName: this.clientName,
    };

    this.orderService.updateOrder(id, updatedOrder).subscribe(
      () => {
        console.log('Order updated');
        this.loadOrders();
      },
      (error) => {
        console.error('Error updating order', error);
      }
    );
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(
      () => {
        console.log('Order deleted');
        this.loadOrders();
      },
      (error) => {
        console.error('Error deleting order', error);
      }
    );
  }
}
