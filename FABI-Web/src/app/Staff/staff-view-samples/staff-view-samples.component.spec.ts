import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewSamplesComponent } from './staff-view-samples.component';

describe('StaffViewSamplesComponent', () => {
  let component: StaffViewSamplesComponent;
  let fixture: ComponentFixture<StaffViewSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
