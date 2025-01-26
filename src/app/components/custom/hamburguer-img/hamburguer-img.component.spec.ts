import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburguerImgComponent } from './hamburguer-img.component';

describe('HamburguerImgComponent', () => {
  let component: HamburguerImgComponent;
  let fixture: ComponentFixture<HamburguerImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburguerImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburguerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
