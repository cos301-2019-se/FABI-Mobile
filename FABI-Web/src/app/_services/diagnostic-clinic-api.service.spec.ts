import { TestBed } from '@angular/core/testing';

import { DiagnosticClinicAPIService } from './diagnostic-clinic-api.service';
import { AuthenticationService } from './authentication.service';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('DiagnosticClinicService', () => {

    class MockAuthenticationService extends AuthenticationService{
        public get getCurrentSessionValue() {
            return { "token" : "86451268546851" };
        }
    } 

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
  }));

  it('should be created', () => {
    const service: DiagnosticClinicAPIService = TestBed.get(DiagnosticClinicAPIService);
    expect(service).toBeTruthy();
  });
});
