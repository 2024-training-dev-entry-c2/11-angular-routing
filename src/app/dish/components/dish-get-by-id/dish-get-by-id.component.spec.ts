import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishGetByIdComponent } from './dish-get-by-id.component';

describe('DishGetByIdComponent', () => {
  let component: DishGetByIdComponent;
  let fixture: ComponentFixture<DishGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishGetByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
