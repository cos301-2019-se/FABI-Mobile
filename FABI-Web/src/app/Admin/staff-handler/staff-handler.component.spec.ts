import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHandlerComponent } from './staff-handler.component';

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


describe('StaffHandlerComponent', () => {
  let component: StaffHandlerComponent;
  let fixture: ComponentFixture<StaffHandlerComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHandlerComponent,
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
    fixture = TestBed.createComponent(StaffHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("");
    component.addStaffForm.controls.staff_surname.setValue("");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.valid).toBeFalsy();
  });

  it("Empty admin surname expect admin surname invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.controls.admin_surname.valid).toBeFalsy();
  });

  it("Empty admin email expect admin email invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.controls.admin_email.valid).toBeFalsy();
  });

  it("Empty admin phone expect admin phone invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.controls.admin_phone.valid).toBeFalsy();
  });

  it("Empty admin type expect admin type invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.controls.admin_phone.valid).toBeFalsy();
  });

  it("Empty database privileges expect database privileges invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("super");
    component.addStaffForm.controls.database_privileges.setValue("[]");

    expect(component.addStaffForm.controls.admin_phone.valid).toBeFalsy();
  });

  it("Valid form expect true", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("super");
    component.addStaffForm.controls.database_privileges.setValue("['Sirex']");

    expect(component.addStaffForm.valid).toBeTruthy();
  });
});
