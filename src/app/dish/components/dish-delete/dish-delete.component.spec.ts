import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDeleteComponent } from './dish-delete.component';

describe('DishDeleteComponent', () => {
  let component: DishDeleteComponent;
  let fixture: ComponentFixture<DishDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
