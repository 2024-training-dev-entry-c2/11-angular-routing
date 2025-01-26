import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-order-delete',
  imports: [],
  templateUrl: './order-delete.component.html',
  styleUrl: './order-delete.component.scss'
})
export class OrderDeleteComponent implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public idOrder: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idOrder = +idParam;
      }
      this.deleteOrder(this.idOrder);
    });
  }

  private deleteOrder(id: number): void {
    this.orderService.delete(id).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Pedido eliminado exitosamente.');
        this.router.navigate(['pedidos']); 
      },
      error: (err) => {
        console.error('Error al eliminar la orden:', err);
        this.notificationService.setNotification('error', 'Error al eliminar la orden.');
      },
    });
  }


}
