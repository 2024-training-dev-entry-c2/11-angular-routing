import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from '../../interfaces/order.interface';
import { IDish } from '../../interfaces/dish.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class OrderModalComponent implements OnInit {
  @Input() order: IOrder | null = null; // Orden para editar
  @Input() dishes: IDish[] = []; // Lista de platos disponibles
  @Output() save = new EventEmitter<IOrder>();
  @Output() cancel = new EventEmitter<void>();

  orderForm!: FormGroup; // Formulario reactivo
  selectedDishIds: number[] = []; // IDs de los platos seleccionados

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Configurar el formulario
    this.orderForm = this.fb.group({
      clientId: [null, [Validators.required]],
      date: [null, [Validators.required]],
      totalCost: [0, [Validators.required, Validators.min(0)]],
    });

    // Si se edita una orden, cargar los datos al formulario
    if (this.order) {
      this.orderForm.patchValue(this.order);
      this.selectedDishIds = [...this.order.dishIds];
    }
  }

  toggleDish(dishId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDishIds.push(dishId);
    } else {
      this.selectedDishIds = this.selectedDishIds.filter((id) => id !== dishId);
    }
  }

  isDishSelected(dishId: number): boolean {
    return this.selectedDishIds.includes(dishId);
  }

  onSave(): void {
    if (this.orderForm.valid) {
      const orderData: IOrder = {
        ...this.orderForm.value,
        id: this.order?.id || 0, // Usar el ID existente o 0 para nuevas órdenes
        dishIds: this.selectedDishIds,
      };
      this.save.emit(orderData); // Emitir el evento con la orden
    }
  }

  onCancel(): void {
    this.cancel.emit(); // Emitir el evento de cancelación
  }
}
