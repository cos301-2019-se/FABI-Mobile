import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationViewSamplesComponent } from './organization-view-samples.component';

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('OrganizationViewSamplesComponent', () => {
  let component: OrganizationViewSamplesComponent;
  let fixture: ComponentFixture<OrganizationViewSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationViewSamplesComponent ],
      imports: [MaterialModule, NoopAnimationsModule, BrowserAnimationsModule]
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
