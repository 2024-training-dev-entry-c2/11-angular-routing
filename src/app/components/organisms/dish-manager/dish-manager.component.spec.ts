import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishManagerComponent } from './dish-manager.component';

describe('DishManagerComponent', () => {
  let component: DishManagerComponent;
  let fixture: ComponentFixture<DishManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
