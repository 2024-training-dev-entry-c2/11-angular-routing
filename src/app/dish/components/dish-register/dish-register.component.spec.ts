import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishRegisterComponent } from './dish-register.component';

describe('DishRegisterComponent', () => {
  let component: DishRegisterComponent;
  let fixture: ComponentFixture<DishRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
