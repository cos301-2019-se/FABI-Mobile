import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDiagnosisComponent } from './pre-diagnosis.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('PreDiagnosisComponent', () => {
  let component: PreDiagnosisComponent;
  let fixture: ComponentFixture<PreDiagnosisComponent>;
  let authService: AuthenticationService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDiagnosisComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDiagnosisComponent);
    component = fixture.componentInstance;
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('authService should be defined', () => {
    expect(authService).toBeTruthy();
  });

});
