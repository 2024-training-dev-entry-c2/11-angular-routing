import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGetAllComponent } from './details-get-all.component';

describe('DetailsGetAllComponent', () => {
  let component: DetailsGetAllComponent;
  let fixture: ComponentFixture<DetailsGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
