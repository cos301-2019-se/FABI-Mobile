import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNotificationComponent } from './staff-notification.component';

describe('StaffNotificationComponent', () => {
  let component: StaffNotificationComponent;
  let fixture: ComponentFixture<StaffNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
