import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileComponent } from './member-profile.component';

import { MaterialModule } from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('MemberProfileComponent', () => {
  let component: MemberProfileComponent;
  let fixture: ComponentFixture<MemberProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileComponent ],
      imports: [MaterialModule,
      NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
