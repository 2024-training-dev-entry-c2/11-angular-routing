import { TestBed } from '@angular/core/testing';

import { GetAllCustomersService } from './get-all-customers.service';

describe('GetAllCustomersService', () => {
  let service: GetAllCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
