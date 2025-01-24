import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionClientsComponent } from './main-section-clients.component';

describe('MainSectionClientsComponent', () => {
  let component: MainSectionClientsComponent;
  let fixture: ComponentFixture<MainSectionClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
