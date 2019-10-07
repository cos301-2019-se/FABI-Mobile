import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHandlerComponent } from './organization-handler.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import { MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

//Router
import { RouterTestingModule } from '@angular/router/testing';


describe('OrganizationHandlerComponent', () => {
  let component: OrganizationHandlerComponent;
  let fixture: ComponentFixture<OrganizationHandlerComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule],
        providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.registerOrgForm.controls.organization_name.setValue("");
    component.registerOrgForm.controls.admin_name.setValue("");
    component.registerOrgForm.controls.admin_surname.setValue("");
    component.registerOrgForm.controls.admin_email.setValue("");
    component.registerOrgForm.controls.admin_phone.setValue("");

    expect(component.registerOrgForm.valid).toBeFalsy();
  });

  it("Empty admin name expect admin name invalid", () => {
    component.registerOrgForm.controls.organization_name.setValue("TestOrg");
    component.registerOrgForm.controls.admin_name.setValue("");
    component.registerOrgForm.controls.admin_surname.setValue("");
    component.registerOrgForm.controls.admin_email.setValue("");
    component.registerOrgForm.controls.admin_phone.setValue("");

    expect(component.registerOrgForm.controls.admin_name.valid).toBeFalsy();
  });

  it("Empty admin surname expect admin surname invalid", () => {
    component.registerOrgForm.controls.organization_name.setValue("TestOrg");
    component.registerOrgForm.controls.admin_name.setValue("TesterFName");
    component.registerOrgForm.controls.admin_surname.setValue("");
    component.registerOrgForm.controls.admin_email.setValue("");
    component.registerOrgForm.controls.admin_phone.setValue("");

    expect(component.registerOrgForm.controls.admin_surname.valid).toBeFalsy();
  });

  it("Empty admin email expect admin email invalid", () => {
    component.registerOrgForm.controls.organization_name.setValue("TestOrg");
    component.registerOrgForm.controls.admin_name.setValue("TesterFName");
    component.registerOrgForm.controls.admin_surname.setValue("TesterLName");
    component.registerOrgForm.controls.admin_email.setValue("");
    component.registerOrgForm.controls.admin_phone.setValue("");

    expect(component.registerOrgForm.controls.admin_email.valid).toBeFalsy();
  });

  it("Empty admin phone expect admin phone invalid", () => {
    component.registerOrgForm.controls.organization_name.setValue("TestOrg");
    component.registerOrgForm.controls.admin_name.setValue("TesterFName");
    component.registerOrgForm.controls.admin_surname.setValue("TesterLName");
    component.registerOrgForm.controls.admin_email.setValue("tester@gmail.com");
    component.registerOrgForm.controls.admin_phone.setValue("");

    expect(component.registerOrgForm.controls.admin_phone.valid).toBeFalsy();
  });

  it("Valid form expect true", () => {
    component.registerOrgForm.controls.organization_name.setValue("TestOrg");
    component.registerOrgForm.controls.admin_name.setValue("TesterFName");
    component.registerOrgForm.controls.admin_surname.setValue("TesterLName");
    component.registerOrgForm.controls.admin_email.setValue("tester@gmail.com");
    component.registerOrgForm.controls.admin_phone.setValue("0000000000");

    expect(component.registerOrgForm.valid).toBeTruthy();
  });
  
  
});
