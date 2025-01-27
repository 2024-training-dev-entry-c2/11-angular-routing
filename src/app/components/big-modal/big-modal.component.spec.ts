import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigModalComponent } from './big-modal.component';

describe('BigModalComponent', () => {
  let component: BigModalComponent;
  let fixture: ComponentFixture<BigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
