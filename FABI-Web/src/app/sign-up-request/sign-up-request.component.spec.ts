import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRequestComponent } from './sign-up-request.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('SignUpRequestComponent', () => {
  let component: SignUpRequestComponent;
  let fixture: ComponentFixture<SignUpRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpRequestComponent ],
      imports: [MatSnackBarModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
