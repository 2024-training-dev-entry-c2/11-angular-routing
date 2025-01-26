import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishGetAllComponent } from './dish-get-all.component';

describe('DishGetAllComponent', () => {
  let component: DishGetAllComponent;
  let fixture: ComponentFixture<DishGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
