import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminViewSamplesComponent } from './clinic-admin-view-samples.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FilterPipe } from '../../_pipes/filter.pipe';

describe('ClinicAdminViewSamplesComponent', () => {
  let component: ClinicAdminViewSamplesComponent;
  let fixture: ComponentFixture<ClinicAdminViewSamplesComponent>;
  let DiagnosticClinicService : DiagnosticClinicAPIService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "token" : "86451268546851" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPipe, ClinicAdminViewSamplesComponent ],
      imports: [ MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
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
    fixture = TestBed.createComponent(ClinicAdminViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('view samples', () => {
    let spy = spyOn(DiagnosticClinicService, 'getAllSamples');
    component.viewSamples();
    expect(spy).toBeTruthy();
  });

});
