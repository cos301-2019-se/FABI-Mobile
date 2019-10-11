import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminViewSamplesComponent } from './clinic-admin-view-samples.component';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';
import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { LoadingComponent } from 'src/app/_loading/loading.component';

describe('ClinicAdminViewSamplesComponent', () => {
  let component: ClinicAdminViewSamplesComponent;
  let fixture: ComponentFixture<ClinicAdminViewSamplesComponent>;

  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return {  "token" : "86451268546851",
                  "user"  : {
                    "organisation" : "",
                    "ID" : ""
                  }
              };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPipe, ClinicAdminViewSamplesComponent ],
      imports: [ MatSnackBarModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdminViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
    authService = new AuthenticationService(null);
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(DiagnosticClinicAPIService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.updateSampleStatusForm).toBeDefined();
    expect(component.updateSampleStatusForm.invalid).toBeTruthy();

    expect(component.isEditingSample).toBeFalsy();

    expect(component.sampleTableLoading).toBeTruthy();
  });

  // -------- Form Controls Tests --------
  it('Empty sample status expect invalid', () => {
    component.updateSampleStatusForm.controls.sample_status.setValue('');
    expect(component.updateSampleStatusForm.controls.sample_status.valid).toBeFalsy();
  });

  // -------- Service Tests --------
  it('view samples', () => {
    let spy = spyOn(DiagnosticClinicService, 'getAllSamples');
    component.viewSamples();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('selecting sample', () =>{
    component.selectSample( {data : "testData"} );
    expect(component.selectedSampleData == "testData").toBeTruthy();
  });

  it('reset Sample Fields', () =>{
    component.resetSampleFields();
    expect(component.sampleFields).toEqual([]);
  });

  it('updating Sample Status', () =>{
    component.updatingSampleStatus({data : "testData"});
    expect(component.editingSample).toEqual({data : "testData"} );
    expect(component.isEditingSample).toBeTruthy();
  });

  // it('update Sample Status', () =>{
  //   let spy = spyOn(DiagnosticClinicService, 'updateSamplesStatus');
  //   component.updateSampleStatus({data : "testData"});
  //   expect(spy).toBeTruthy();
  // });

});
