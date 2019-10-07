import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { AdminProfileComponent } from './admin-profile.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        MaterialModule, 
        RouterTestingModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule, 
        MatDialogModule
      ],
      declarations: [ AdminProfileComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
