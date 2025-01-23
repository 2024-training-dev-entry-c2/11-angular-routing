import { TestBed } from '@angular/core/testing';

import { GetAllDishesService } from './get-all-dishes.service';

describe('GetAllDishesService', () => {
  let service: GetAllDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
