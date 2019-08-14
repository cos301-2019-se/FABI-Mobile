import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHelpComponent } from './organization-help.component';

describe('OrganizationHelpComponent', () => {
  let component: OrganizationHelpComponent;
  let fixture: ComponentFixture<OrganizationHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
