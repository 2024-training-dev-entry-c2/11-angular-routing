import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsActionsComponent } from './btns-actions.component';

describe('BtnsActionsComponent', () => {
  let component: BtnsActionsComponent;
  let fixture: ComponentFixture<BtnsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnsActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
