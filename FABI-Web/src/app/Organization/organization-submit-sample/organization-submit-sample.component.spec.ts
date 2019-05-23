import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSubmitSampleComponent } from './organization-submit-sample.component';

import { SampleFormComponent } from '../../sample-form/sample-form.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('OrganizationSubmitSampleComponent', () => {
  let component: OrganizationSubmitSampleComponent;
  let fixture: ComponentFixture<OrganizationSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSubmitSampleComponent, SampleFormComponent ],
      imports: [MaterialModule,HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule]
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
