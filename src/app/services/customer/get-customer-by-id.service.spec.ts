import { TestBed } from '@angular/core/testing';

import { GetCustomerByIdService } from './get-customer-by-id.service';

describe('GetCustomerByIdService', () => {
  let service: GetCustomerByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
