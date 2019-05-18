import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSubmitSampleComponent } from './staff-submit-sample.component';

describe('StaffSubmitSampleComponent', () => {
  let component: StaffSubmitSampleComponent;
  let fixture: ComponentFixture<StaffSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSubmitSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
