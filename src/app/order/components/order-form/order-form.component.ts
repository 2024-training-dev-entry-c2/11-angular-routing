import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  @Input() title: String = '';
  @Input() action: String = '';
  public idOrder?: number;

  public form = this.formBuilder.group({
    idCliente: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    detalles: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idOrder = +idParam;
      }

      if (idParam && this.action === 'update') {
        this.idOrder = +idParam;
        this.loadOrderData(this.idOrder);
      }
    });
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  addDetalle(): void {
    this.detalles.push(
      this.formBuilder.group({
        idPlato: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        cantidad: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      })
    );
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  private loadOrderData(id: number): void {
    this.orderService.processOrderData(
      id,
      (order) => {
        this.form.patchValue({
          idCliente: order.idCliente,
        });
        this.detalles.clear();
        order.detalles.forEach((detalle) => {
          this.detalles.push(this.formBuilder.group(detalle));
        });
      },
      (err) => {
        this.notificationService.setNotification('error', 'Error al cargar datos de la orden.');
        console.error('Error al cargar datos de la orden:', err);
      },
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notificationService.setNotification('error', 'Formulario inválido.');
      return;
    }

    const order: IOrder = this.form.value as IOrder;

    if (this.action === 'save') {
      this.saveOrder(order);
    } else if (this.action === 'update' && this.idOrder) {
      this.updateOrder(this.idOrder, order);
    }
  }

  saveOrder(order: IOrder): void {
    this.orderService.save(order).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Pedido guardado con éxito.');
        this.router.navigate(['pedidos']);
      },
      error: () => this.notificationService.setNotification('error', 'Error al guardar el pedido.'),
    });
  }

  updateOrder(idOrder: number, order: IOrder): void {
    this.orderService.update(idOrder, order).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Pedido actualizado con éxito.');
        this.router.navigate(['pedidos']);
      },
      error: () => this.notificationService.setNotification('error', 'Error al actualizar el pedido.'),
    });
  }

}
