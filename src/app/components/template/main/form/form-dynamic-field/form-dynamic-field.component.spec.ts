import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicFieldComponent } from './form-dynamic-field.component';

describe('FormDynamicFieldComponent', () => {
  let component: FormDynamicFieldComponent;
  let fixture: ComponentFixture<FormDynamicFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDynamicFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDynamicFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
