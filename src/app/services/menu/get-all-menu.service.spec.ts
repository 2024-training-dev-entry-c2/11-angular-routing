import { TestBed } from '@angular/core/testing';

import { GetAllMenuService } from './get-all-menu.service';

describe('GetAllMenuService', () => {
  let service: GetAllMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
