import { Component, inject, OnInit } from '@angular/core';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { IReservationResponse } from '../../../../interfaces/reservationResponse.interface';
import { AddReservationService } from '../../../../services/reservation/add-reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditReservationService } from '../../../../services/reservation/edit-reservation.service';
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

  formConfig = [
    {
      name: 'customerId',
      label: 'Customer ID',
      type: 'number',
      errorMessage: 'Customer ID is required.',
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
      options: ['pending', 'completed', 'cancelled'],
      errorMessage:
        'Status is required. Must be one of: pending, completed, cancelled.',
    },
  ];

  private addReservationService = inject(AddReservationService);
  private editReservationService = inject(EditReservationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.reservationId = +id;
        this.loadReservationData(this.reservationId);
      }
    });
  }

  loadReservationData(id: number): void {
    this.editReservationService.getReservation(id).subscribe((reservation) => {
      reservation.time = reservation.time.slice(0, 16);
      this.formData = reservation;
    });
  }

  submitAction(data: any): void {
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
