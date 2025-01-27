import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionEditComponent } from './modal-action-edit.component';

describe('ModalActionEditComponent', () => {
  let component: ModalActionEditComponent;
  let fixture: ComponentFixture<ModalActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalActionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
