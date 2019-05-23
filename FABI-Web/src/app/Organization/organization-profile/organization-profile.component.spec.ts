import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProfileComponent } from './organization-profile.component';

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('OrganizationProfileComponent', () => {
  let component: OrganizationProfileComponent;
  let fixture: ComponentFixture<OrganizationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileComponent ],
      imports: [NoopAnimationsModule, BrowserAnimationsModule,MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
