import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
  selector: 'app-orders',
  imports: [MatIconModule, ModalComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
