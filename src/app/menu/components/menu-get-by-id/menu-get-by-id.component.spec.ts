import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGetByIdComponent } from './menu-get-by-id.component';

describe('MenuGetByIdComponent', () => {
  let component: MenuGetByIdComponent;
  let fixture: ComponentFixture<MenuGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuGetByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
