import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewSamplesComponent } from './staff-view-samples.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('StaffViewSamplesComponent', () => {
  let component: StaffViewSamplesComponent;
  let fixture: ComponentFixture<StaffViewSamplesComponent>;
  let authService: AuthenticationService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffViewSamplesComponent,
        FilterPipe
      ],
      imports: [MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewSamplesComponent);
    component = fixture.componentInstance;
    authService = new AuthenticationService(null);
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('resetSampleFields', () =>{
    component.resetSampleFields();
    expect(component.sampleFields).toEqual([]);
  });

  it('get all organization samples', () =>{
    let spy = spyOn(DiagnosticClinicService, 'retrieveMemberSamples');
    component.viewSamples();
    expect(spy).toBeTruthy();
  });

});
