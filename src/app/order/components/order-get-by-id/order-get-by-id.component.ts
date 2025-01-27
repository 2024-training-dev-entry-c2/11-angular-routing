import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../notification/services/notification.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-get-by-id',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './order-get-by-id.component.html',
  styleUrl: './order-get-by-id.component.scss'
})
export class OrderGetByIdComponent {
  private formBuilder = inject(FormBuilder);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);

  public id: number = 0;
  public order: IOrder | null = null;

  public form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  public loadOrderData(id: number): void {
    this.orderService.processOrderData(
      id,
      (order) => {
        this.order = order;
      },
      (err) => {
        this.notificationService.setNotification('error', 'No se encontró una orden con esa ID.');
        console.error('Error al cargar orden:', err);
      },
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.setNotification('error', 'Formulario invalido');
      return;
    }

    this.id = +this.form.get('id')!.value!;
    this.loadOrderData(this.id);
  }
}
