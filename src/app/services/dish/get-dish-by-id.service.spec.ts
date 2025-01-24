import { TestBed } from '@angular/core/testing';

import { GetDishByIdService } from './get-dish-by-id.service';

describe('GetDishByIdService', () => {
  let service: GetDishByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDishByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
