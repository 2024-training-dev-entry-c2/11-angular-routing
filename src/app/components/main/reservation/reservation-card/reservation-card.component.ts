import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReservationResponse } from '../../../../interfaces/reservationResponse.interface';
import { DeleteReservationService } from '../../../../services/reservation/delete-reservation.service';
import { GetCustomerByIdService } from '../../../../services/customer/get-customer-by-id.service';
import { ConfirmModelComponent } from '../../confirm-model/confirm-model.component';
import { BtnsActionsComponent } from '../../../custom/btns-actions/btns-actions.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-card',
  imports: [BtnsActionsComponent, ConfirmModelComponent, DatePipe],
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.scss'],
})
export class ReservationCardComponent implements OnInit {
  @Input() reservation!: IReservationResponse;
  isModalOpen = false;
  customerName: string = '';

  constructor(
    private router: Router,
    private deleteReservationService: DeleteReservationService,
    private getCustomerByIdService: GetCustomerByIdService
  ) {}

  ngOnInit(): void {
    this.getCustomerByIdService
      .execute(this.reservation.customerId)
      .subscribe((customer: any) => {
        this.customerName = `${customer.firstName} ${customer.lastName}`;
      });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteReservationService
      .deleteReservation(this.reservation.id)
      .subscribe(() => {
        this.closeModal();
      });
  }

  editReservation(): void {
    this.router.navigate(['reservation/edit', this.reservation.id]);
  }
}
