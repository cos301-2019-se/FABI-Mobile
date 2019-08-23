import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHelpComponent } from './staff-help.component';

describe('StaffHelpComponent', () => {
  let component: StaffHelpComponent;
  let fixture: ComponentFixture<StaffHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
