import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGetByIdComponent } from './details-get-by-id.component';

describe('DetailsGetByIdComponent', () => {
  let component: DetailsGetByIdComponent;
  let fixture: ComponentFixture<DetailsGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGetByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
