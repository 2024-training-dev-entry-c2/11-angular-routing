import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGetAllComponent } from './menu-get-all.component';

describe('MenuGetAllComponent', () => {
  let component: MenuGetAllComponent;
  let fixture: ComponentFixture<MenuGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
