import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DishService } from '../../../core/services/dish.service';
import { Idish } from '../../../interfaces/dish/dish';
import { ClientService } from '../../../core/services/client.service';
import { Iclient } from '../../../interfaces/client/client';
import { Iorder, Iorders } from '../../../interfaces/order/order';
import { OrdersComponent } from '../../../pages/orders/orders.component';
@Component({
  selector: 'app-order-create',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent {
  @Input() isOpenFormOrder = false;
  @Output() closeModalFormOrder = new EventEmitter<void>();
  public platos: Idish[] = [];
  public users: Iclient[] = [];
  public orderPlantilla!: Iorders;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dish: DishService,
    private usuarios: ClientService,
    private order: OrdersComponent
  ) {}

  ngOnInit() {
    this.initForm();
    this.dish.dishes.subscribe((dishes) => (this.platos = dishes));
    this.usuarios.clientes.subscribe((users) => (this.users = users));
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      date: ['', Validators.required],
      usuarios: [[], Validators.required],
      dishIds: [[], Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    const formValue = this.editForm.value;

    const orderDetails = formValue.dishIds.map((dishId: string) => ({
      dish: { id: parseInt(dishId, 10) },
      quantity: formValue.quantity,
    }));

    this.orderPlantilla = {
      date: formValue.date,
      total: 0,
      user: {
        id: parseInt(formValue.usuarios[0], 10),
      },
      orderDetails,
    };

    console.log(this.orderPlantilla);

    if (this.editForm.valid) {
      this.order.createOrder(this.orderPlantilla);
    } else {
      console.error('Formulario inválido');
    }
  }

  close() {
    this.editForm.reset();
    this.closeModalFormOrder.emit();
  }
}
