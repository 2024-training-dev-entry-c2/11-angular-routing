import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOrderService } from '../../../../services/order/add-order.service';
import { EditOrderService } from '../../../../services/order/edit-order.service';
import { GetAllDishesService } from '../../../../services/dish/get-all-dishes.service';
import { GetAllReservationService } from '../../../../services/reservation/get-all-reservation.service';
import { IDish } from '../../../../interfaces/dishResponse.interface';
import { IReservationResponse } from '../../../../interfaces/reservationResponse.interface';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { FormTitleComponent } from '../../../custom/form-title/form-title.component';
import { IOrderRequests } from '../../../../interfaces/orderRequest.interface';
import { IOrderResponse } from '../../../../interfaces/orderResponese.interface';

@Component({
  selector: 'app-order-form',
  imports: [CustomFormComponent, FormTitleComponent],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  orderId: number | null = null;
  formData: IOrderRequests | null = null;
  dishes: IDish[] = [];
  reservations: IReservationResponse[] = [];

  formConfig: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: number | string }[];
  }[] = [
    {
      name: 'reservationId',
      label: 'Reservation ID',
      type: 'select',
      errorMessage: 'Reservation ID is required.',
      options: [],
    },
    {
      name: 'dishIds',
      label: 'dishes',
      type: 'array',
      errorMessage: 'At least one dish is required.',
      options: [],
    },
  ];

  form!: FormGroup;

  private addOrderService = inject(AddOrderService);
  private editOrderService = inject(EditOrderService);
  private getAllDishesService = inject(GetAllDishesService);
  private getAllReservationService = inject(GetAllReservationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      reservationId: ['', Validators.required],
      dishIds: this.fb.array([], Validators.required),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderId = +id;
        this.loadOrderData(this.orderId);
      }
    });

    this.loadDishes();
    this.loadReservations();
  }

  loadOrderData(id: number): void {
    this.editOrderService.getOrder(id).subscribe((order) => {
      this.formData = order;
      this.setFormData(order);
    });
  }

  loadDishes(): void {
    this.getAllDishesService.execute().subscribe((dishes) => {
      this.dishes = dishes;

      const dishIdsConfig = this.formConfig.find(
        (config) => config.name === 'dishIds'
      );
      if (dishIdsConfig) {
        dishIdsConfig.options = dishes.map((dish) => ({
          label: dish.name,
          value: dish.id,
        }));
      }
    });
  }

  loadReservations(): void {
    this.getAllReservationService.execute().subscribe((reservations) => {
      this.reservations = reservations;

      const reservationIdConfig = this.formConfig.find(
        (config) => config.name === 'reservationId'
      );
      if (reservationIdConfig) {
        reservationIdConfig.options = reservations.map((reservation) => ({
          label: reservation.id.toString(),
          value: reservation.id.toString(),
        }));
      }
    });
  }

  setFormData(order: IOrderRequests): void {
    this.form.patchValue({
      reservationId: order.reservationId,
    });

    const dishIdsArray = this.form.get('dishIds') as FormArray;
    dishIdsArray.clear();

    if (order.dishIds && Array.isArray(order.dishIds)) {
      order.dishIds.forEach((dishId: number) => {
        dishIdsArray.push(this.fb.control(dishId, Validators.required));
      });
    }
  }

  submitAction(data: IOrderRequests): void {
    if (data.dishIds) {
      data.dishIds = data.dishIds.map((dishId: number | string) =>
        typeof dishId === 'string' ? parseInt(dishId, 10) : dishId
      );
    }

    if (data.reservationId) {
      data.reservationId =
        typeof data.reservationId === 'string'
          ? parseInt(data.reservationId, 10)
          : data.reservationId;
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
