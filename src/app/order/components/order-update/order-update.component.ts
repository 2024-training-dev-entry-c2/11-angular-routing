import { Component } from '@angular/core';
import { OrderFormComponent } from '../order-form/order-form.component';
@Component({
  selector: 'app-order-update',
  imports: [OrderFormComponent],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss'
})
export class OrderUpdateComponent {
  public title: String = "Actualizar Pedido";
  public action: String = "update";
}
