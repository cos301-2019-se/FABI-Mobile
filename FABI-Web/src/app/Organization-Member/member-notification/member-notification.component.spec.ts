import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNotificationComponent } from './member-notification.component';

describe('MemberNotificationComponent', () => {
  let component: MemberNotificationComponent;
  let fixture: ComponentFixture<MemberNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
