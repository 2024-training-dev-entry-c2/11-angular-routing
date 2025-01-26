import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRegisterComponent } from './details-register.component';

describe('DetailsRegisterComponent', () => {
  let component: DetailsRegisterComponent;
  let fixture: ComponentFixture<DetailsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
