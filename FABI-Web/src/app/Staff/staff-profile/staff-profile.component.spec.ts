import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { StaffProfileComponent } from './staff-profile.component';
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

describe('StaffProfileComponent', () => {
  let component: StaffProfileComponent;
  let fixture: ComponentFixture<StaffProfileComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileComponent ],
      imports: [ReactiveFormsModule, MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("");
    component.staffProfileForm.controls.staff_surname.setValue("");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.valid).toBeTruthy();
  });

  it("Empty staff surname expect staffsurname name invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_surname.valid).toBeFalsy();
  });

  it("Empty staff email expect staff email invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("TesterFName");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_email.valid).toBeFalsy();
  });

  it("Empty staff type expect staff type invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("TesterFName");
    component.staffProfileForm.controls.staff_email.setValue("TesterLName");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_type.valid).toBeFalsy();
  });

  it("Valid form expect true", () => {
    component.staffProfileForm.controls.staff_name.setValue("TesterFName");
    component.staffProfileForm.controls.staff_surname.setValue("TesterLName");
    component.staffProfileForm.controls.staff_email.setValue("tester@gmail.com");
    component.staffProfileForm.controls.staff_type.setValue("super");

    expect(component.staffProfileForm.valid).toBeTruthy();
  });

});
