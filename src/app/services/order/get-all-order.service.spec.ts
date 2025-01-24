import { TestBed } from '@angular/core/testing';

import { GetAllOrderService } from './get-all-order.service';

describe('GetAllOrderService', () => {
  let service: GetAllOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
