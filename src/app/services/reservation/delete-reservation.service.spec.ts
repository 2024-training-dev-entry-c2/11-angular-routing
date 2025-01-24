import { TestBed } from '@angular/core/testing';

import { DeleteReservationService } from './delete-reservation.service';

describe('DeleteReservationService', () => {
  let service: DeleteReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
