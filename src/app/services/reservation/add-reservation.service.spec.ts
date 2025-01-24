import { TestBed } from '@angular/core/testing';

import { AddReservationService } from './add-reservation.service';

describe('AddReservationService', () => {
  let service: AddReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
