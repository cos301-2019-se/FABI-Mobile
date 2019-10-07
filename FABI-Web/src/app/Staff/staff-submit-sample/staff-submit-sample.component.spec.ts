import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSubmitSampleComponent } from './staff-submit-sample.component';


import { SampleFormComponent } from '../../sample-form/sample-form.component';

import { MapsWindowComponent } from '../../maps-window/maps-window.component';

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


describe('StaffSubmitSampleComponent', () => {
  let component: StaffSubmitSampleComponent;
  let fixture: ComponentFixture<StaffSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSubmitSampleComponent, SampleFormComponent, MapsWindowComponent ],
      imports: [HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule,MaterialModule, ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
