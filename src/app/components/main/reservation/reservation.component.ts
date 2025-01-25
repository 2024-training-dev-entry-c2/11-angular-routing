import { Component, OnInit } from '@angular/core';
import { MenuCardComponent } from '../menu/menu-card/menu-card.component';
import { TitleComponent } from '../../custom/title/title.component';
import { AddComponent } from '../../custom/add/add.component';
import { IReservationResponse } from '../../../interfaces/reservationResponse.interface';
import { interval, Subscription, switchMap } from 'rxjs';
import { GetAllReservationService } from '../../../services/reservation/get-all-reservation.service';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { NoDataComponent } from '../../custom/no-data/no-data.component';

@Component({
  selector: 'app-reservation',
  imports: [
    TitleComponent,
    AddComponent,
    ReservationCardComponent,
    NoDataComponent,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  title = 'Reservations ';
  addLink = '/reservation/add';
  reservations: IReservationResponse[] = [];
  private refreshSubscription!: Subscription;

  constructor(private getAllReservationsService: GetAllReservationService) {}

  ngOnInit(): void {
    this.refreshSubscription = interval(100)
      .pipe(switchMap(() => this.getAllReservationsService.execute()))
      .subscribe({
        next: (data) => (this.reservations = data),
        error: (err) => console.error('Error fetching reservations:', err),
      });
  }

  trackByFn(index: number, reservation: IReservationResponse): number {
    return reservation.id;
  }
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
