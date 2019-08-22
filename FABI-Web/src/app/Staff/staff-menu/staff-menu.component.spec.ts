import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMenuComponent } from './staff-menu.component';

describe('StaffMenuComponent', () => {
  let component: StaffMenuComponent;
  let fixture: ComponentFixture<StaffMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
