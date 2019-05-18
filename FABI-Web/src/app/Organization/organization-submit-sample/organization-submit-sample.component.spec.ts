import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSubmitSampleComponent } from './organization-submit-sample.component';

describe('OrganizationSubmitSampleComponent', () => {
  let component: OrganizationSubmitSampleComponent;
  let fixture: ComponentFixture<OrganizationSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSubmitSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
