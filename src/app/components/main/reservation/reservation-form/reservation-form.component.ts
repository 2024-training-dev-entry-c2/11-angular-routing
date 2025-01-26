import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReservationService } from '../../../../services/reservation/add-reservation.service';
import { EditReservationService } from '../../../../services/reservation/edit-reservation.service';
import { GetAllCustomersService } from '../../../../services/customer/get-all-customers.service';
import { ICustomer } from '../../../../interfaces/customerResponse.interface';
import { IReservationResponse } from '../../../../interfaces/reservationResponse.interface';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { FormTitleComponent } from '../../../custom/form-title/form-title.component';

@Component({
  selector: 'app-reservation-form',
  imports: [CustomFormComponent, FormTitleComponent],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservationId: number | null = null;
  formData: IReservationResponse | null = null;
  customers: ICustomer[] = [];

  formConfig = [
    {
      name: 'customerId',
      label: 'Customer',
      type: 'select',
      options: [],
      errorMessage: 'Customer is required.',
    },
    {
      name: 'time',
      label: 'Time',
      type: 'datetime-local',
      errorMessage: 'Time is required.',
    },
    {
      name: 'people',
      label: 'People',
      type: 'number',
      errorMessage: 'People is required.',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'Confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      errorMessage:
        'Status is required. Must be one of: pending, completed, cancelled.',
    },
  ];

  form!: FormGroup;

  private addReservationService = inject(AddReservationService);
  private editReservationService = inject(EditReservationService);
  private getAllCustomersService = inject(GetAllCustomersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      time: ['', Validators.required],
      people: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.reservationId = +id;
        this.loadReservationData(this.reservationId);
      }
    });

    this.loadCustomers();
  }

  loadReservationData(id: number): void {
    this.editReservationService.getReservation(id).subscribe((reservation) => {
      reservation.time = reservation.time.slice(0, 16);
      this.formData = reservation;
    });
  }

  loadCustomers(): void {
    this.getAllCustomersService.execute().subscribe((customers) => {
      this.customers = customers;

      const customerConfig = this.formConfig.find(
        (config) => config.name === 'customerId'
      );
      if (customerConfig) {
        customerConfig.options = customers.map((customer) => ({
          label: `${customer.firstName} ${customer.lastName}`,
          value: customer.id.toString(),
        }));
      }
    });
  }

  submitAction(data: IReservationResponse): void {
    data.time = new Date(data.time).toISOString();
    if (this.reservationId) {
      this.editReservationService
        .updateReservation(this.reservationId, data)
        .subscribe(() => {
          this.router.navigate(['/reservation']);
        });
    } else {
      this.addReservationService.execute(data).subscribe(() => {
        this.router.navigate(['/reservation']);
      });
    }
  }
}
