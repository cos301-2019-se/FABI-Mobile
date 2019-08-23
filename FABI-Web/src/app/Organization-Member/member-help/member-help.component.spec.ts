import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHelpComponent } from './member-help.component';

describe('MemberHelpComponent', () => {
  let component: MemberHelpComponent;
  let fixture: ComponentFixture<MemberHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
