import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { StaffProfileComponent } from './staff-profile.component';

describe('StaffProfileComponent', () => {
  let component: StaffProfileComponent;
  let fixture: ComponentFixture<StaffProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
