import { TestBed } from '@angular/core/testing';

import { GetCustomerService } from './get-customer.service';

describe('GetCustomerService', () => {
  let service: GetCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
