import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationViewSamplesComponent } from './organization-view-samples.component';

describe('OrganizationViewSamplesComponent', () => {
  let component: OrganizationViewSamplesComponent;
  let fixture: ComponentFixture<OrganizationViewSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationViewSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
