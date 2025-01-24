import { TestBed } from '@angular/core/testing';

import { EditReservationService } from './edit-reservation.service';

describe('EditReservationService', () => {
  let service: EditReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
