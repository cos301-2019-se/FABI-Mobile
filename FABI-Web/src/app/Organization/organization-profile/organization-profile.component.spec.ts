import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganizationProfileComponent } from './organization-profile.component';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

//Import the materials component
import { MaterialModule } from '../../materials';
import { AuthenticationService } from 'src/app/_services/authentication.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('OrganizationProfileComponent', () => {
  let component: OrganizationProfileComponent;
  let fixture: ComponentFixture<OrganizationProfileComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileComponent ],
      imports: [
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.adminProfileForm.controls.organization_name.setValue("");
    component.adminProfileForm.controls.admin_name.setValue("");
    component.adminProfileForm.controls.admin_surname.setValue("");
    component.adminProfileForm.controls.admin_email.setValue("");

    expect(component.adminProfileForm.valid).toBeFalsy();
  });

  it("Empty admin name expect admin name invalid", () => {
    component.adminProfileForm.controls.organization_name.setValue("Test");
    component.adminProfileForm.controls.admin_name.setValue("");
    component.adminProfileForm.controls.admin_surname.setValue("");
    component.adminProfileForm.controls.admin_email.setValue("");

    expect(component.adminProfileForm.controls.admin_name.valid).toBeFalsy();
  });

  it("Empty admin surname expect admin surname invalid", () => {
    component.adminProfileForm.controls.organization_name.setValue("Test");
    component.adminProfileForm.controls.admin_name.setValue("TesterFName");
    component.adminProfileForm.controls.admin_surname.setValue("");
    component.adminProfileForm.controls.admin_email.setValue("");

    expect(component.adminProfileForm.controls.admin_surname.valid).toBeFalsy();
  });

  it("Empty admin email expect admin email invalid", () => {
    component.adminProfileForm.controls.organization_name.setValue("Test");
    component.adminProfileForm.controls.admin_name.setValue("TesterFName");
    component.adminProfileForm.controls.admin_surname.setValue("TesterLName");
    component.adminProfileForm.controls.admin_email.setValue("");

    expect(component.adminProfileForm.controls.admin_email.valid).toBeFalsy();
  });

  // it("Valid form expect true", () => {
  //   component.adminProfileForm.controls.organization_name.setValue("Test");
  //   component.adminProfileForm.controls.admin_name.setValue("TesterFName");
  //   component.adminProfileForm.controls.admin_surname.setValue("TesterLName");
  //   component.adminProfileForm.controls.admin_email.setValue("tester@gmail.com");

  //   expect(component.adminProfileForm.valid).toBeTruthy();
  // });

});
