import { TestBed } from '@angular/core/testing';

import { DeleteCustomerService } from './delete-customer.service';

describe('DeleteCustomerService', () => {
  let service: DeleteCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
