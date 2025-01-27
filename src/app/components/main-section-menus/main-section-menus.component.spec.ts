import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionMenusComponent } from './main-section-menus.component';

describe('MainSectionMenusComponent', () => {
  let component: MainSectionMenusComponent;
  let fixture: ComponentFixture<MainSectionMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
