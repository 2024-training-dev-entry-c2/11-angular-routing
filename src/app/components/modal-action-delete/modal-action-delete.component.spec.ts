import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionDeleteComponent } from './modal-action-delete.component';

describe('ModalActionDeleteComponent', () => {
  let component: ModalActionDeleteComponent;
  let fixture: ComponentFixture<ModalActionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalActionDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
