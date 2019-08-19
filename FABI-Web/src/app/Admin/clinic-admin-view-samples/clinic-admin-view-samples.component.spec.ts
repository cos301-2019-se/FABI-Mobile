import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminViewSamplesComponent } from './clinic-admin-view-samples.component';

describe('ClinicAdminViewSamplesComponent', () => {
  let component: ClinicAdminViewSamplesComponent;
  let fixture: ComponentFixture<ClinicAdminViewSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAdminViewSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdminViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
