import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSubmitSampleComponent } from './member-submit-sample.component';

describe('MemberSubmitSampleComponent', () => {
  let component: MemberSubmitSampleComponent;
  let fixture: ComponentFixture<MemberSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSubmitSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
