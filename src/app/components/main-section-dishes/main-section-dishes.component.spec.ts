import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionDishesComponent } from './main-section-dishes.component';

describe('MainSectionDishesComponent', () => {
  let component: MainSectionDishesComponent;
  let fixture: ComponentFixture<MainSectionDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
