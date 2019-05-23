import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashboardComponent } from './member-dashboard.component';

import { MaterialModule } from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MemberDashboardComponent', () => {
  let component: MemberDashboardComponent;
  let fixture: ComponentFixture<MemberDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDashboardComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
