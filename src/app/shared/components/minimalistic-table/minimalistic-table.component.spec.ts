import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalisticTableComponent } from './minimalistic-table.component';

describe('MinimalisticTableComponent', () => {
  let component: MinimalisticTableComponent;
  let fixture: ComponentFixture<MinimalisticTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalisticTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalisticTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
