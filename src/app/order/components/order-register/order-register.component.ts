import { Component } from '@angular/core';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-register',
  imports: [OrderFormComponent ],
  templateUrl: './order-register.component.html',
  styleUrl: './order-register.component.scss'
})
export class OrderRegisterComponent {
  public title: String = "Registrar Pedido";
  public action: String = "save";
}
