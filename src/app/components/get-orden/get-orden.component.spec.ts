import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrdenComponent } from './get-orden.component';

describe('GetOrdenComponent', () => {
  let component: GetOrdenComponent;
  let fixture: ComponentFixture<GetOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
