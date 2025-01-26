import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOrderService } from '../../../../services/order/add-order.service';
import { EditOrderService } from '../../../../services/order/edit-order.service';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { FormTitleComponent } from '../../../custom/form-title/form-title.component';

@Component({
  selector: 'app-order-form',
  imports: [CustomFormComponent, FormTitleComponent],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  orderId: number | null = null;
  formData: any = null;

  formConfig = [
    {
      name: 'reservationId',
      label: 'Reservation ID',
      type: 'number',
      errorMessage: 'Reservation ID is required.',
    },
    {
      name: 'dishIds',
      label: 'Dishes IDs',
      type: 'array',
      errorMessage: 'At least one dish is required.',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      errorMessage: 'Status is required.',
    },
  ];

  private addOrderService = inject(AddOrderService);
  private editOrderService = inject(EditOrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.loadOrderData(this.orderId);
      }
    });
  }

  loadOrderData(id: number): void {
    this.editOrderService.getOrder(id).subscribe((order) => {
      this.formData = order;
    });
  }

  submitAction(data: any): void {
    if (data.dishIds) {
      data.dishIds = data.dishIds.map((dishId: string) => parseInt(dishId, 10));
    }

    if (data.reservationId) {
      data.reservationId = parseInt(data.reservationId, 10);
    }

    if (this.orderId) {
      this.editOrderService.updateOrder(this.orderId, data).subscribe(() => {
        this.router.navigate(['/order']);
      });
    } else {
      this.addOrderService.execute(data).subscribe(() => {
        this.router.navigate(['/order']);
      });
    }
  }
}
