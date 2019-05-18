import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHandlerComponent } from './organization-handler.component';

describe('OrganizationHandlerComponent', () => {
  let component: OrganizationHandlerComponent;
  let fixture: ComponentFixture<OrganizationHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
