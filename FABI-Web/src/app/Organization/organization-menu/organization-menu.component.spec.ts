import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMenuComponent } from './organization-menu.component';

describe('OrganizationMenuComponent', () => {
  let component: OrganizationMenuComponent;
  let fixture: ComponentFixture<OrganizationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
