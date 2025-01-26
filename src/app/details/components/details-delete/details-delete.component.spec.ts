import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDeleteComponent } from './details-delete.component';

describe('DetailsDeleteComponent', () => {
  let component: DetailsDeleteComponent;
  let fixture: ComponentFixture<DetailsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
