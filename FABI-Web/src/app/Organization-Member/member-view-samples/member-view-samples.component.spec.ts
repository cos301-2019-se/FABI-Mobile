import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewSamplesComponent } from './member-view-samples.component';

describe('MemberViewSamplesComponent', () => {
  let component: MemberViewSamplesComponent;
  let fixture: ComponentFixture<MemberViewSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
