import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberProfileComponent } from './member-profile.component';
import { MaterialModule } from '../../materials';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

describe('MemberProfileComponent', () => {
  let component: MemberProfileComponent;
  let fixture: ComponentFixture<MemberProfileComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileComponent ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule, 
        MatSnackBarModule, 
        MatDialogModule,
        RouterTestingModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      providers: [ 
        NotificationService,
        ToastrService,
        { provide: AuthenticationService, useClass: MockAuthenticationService } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.memberProfileForm.controls.organization_name.setValue("");
    component.memberProfileForm.controls.member_name.setValue("");
    component.memberProfileForm.controls.member_surname.setValue("");
    component.memberProfileForm.controls.member_email.setValue("");

    expect(component.memberProfileForm.valid).toBeFalsy();
  });

  it("Empty member name expect member name invalid", () => {
    component.memberProfileForm.controls.organization_name.setValue("Test");
    component.memberProfileForm.controls.member_name.setValue("");
    component.memberProfileForm.controls.member_surname.setValue("");
    component.memberProfileForm.controls.member_email.setValue("");

    expect(component.memberProfileForm.controls.member_name.valid).toBeFalsy();
  });

  it("Empty member surname expect member surname invalid", () => {
    component.memberProfileForm.controls.organization_name.setValue("Test");
    component.memberProfileForm.controls.member_name.setValue("TesterFName");
    component.memberProfileForm.controls.member_surname.setValue("");
    component.memberProfileForm.controls.member_email.setValue("");

    expect(component.memberProfileForm.controls.member_surname.valid).toBeFalsy();
  });

  it("Empty member email expect member email invalid", () => {
    component.memberProfileForm.controls.organization_name.setValue("Test");
    component.memberProfileForm.controls.member_name.setValue("TesterFName");
    component.memberProfileForm.controls.member_surname.setValue("TesterLName");
    component.memberProfileForm.controls.member_email.setValue("");

    expect(component.memberProfileForm.controls.member_email.valid).toBeFalsy();
  });

  
});
