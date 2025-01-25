import { Component, Input } from '@angular/core';

import { BtnsActionsComponent } from '../../../custom/btns-actions/btns-actions.component';
import { CurrencyPipe } from '@angular/common';
import { ConfirmModelComponent } from '../../confirm-model/confirm-model.component';
import { IOrderResponse } from '../../../../interfaces/orderResponese.interface';
import { Router } from '@angular/router';
import { DeleteOrderService } from '../../../../services/order/delete-order.service';

@Component({
  selector: 'app-order-card',
  imports: [BtnsActionsComponent, CurrencyPipe, ConfirmModelComponent],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() order!: IOrderResponse;
  isModalOpen = false;

  constructor(
    private router: Router,
    private deleteOrderService: DeleteOrderService
  ) {}

  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteOrderService.deleteOrder(this.order.id).subscribe(() => {
      this.closeModal();
    });
  }

  editOrder(): void {
    this.router.navigate(['order/edit', this.order.id]);
  }
}
