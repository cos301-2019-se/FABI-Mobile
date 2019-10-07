import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import {MaterialModule} from '../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';

import { CookieService } from 'ngx-cookie-service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
        providers: [ CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty organization name expect email organization name invalid", () => {
    component.request_register_org.controls.organization_name.setValue("");
    component.request_register_org.controls.admin_name.setValue("");
    component.request_register_org.controls.admin_surname.setValue("");
    component.request_register_org.controls.admin_email.setValue("");
    component.request_register_org.controls.admin_phone.setValue("");

    expect(component.request_register_org.controls.organization_name.valid).toBeFalsy();
  });

  it("Empty admin name expect email admin name invalid", () => {
    component.request_register_org.controls.organization_name.setValue("TestOrg");
    component.request_register_org.controls.admin_name.setValue("");
    component.request_register_org.controls.admin_surname.setValue("");
    component.request_register_org.controls.admin_email.setValue("");
    component.request_register_org.controls.admin_phone.setValue("");

    expect(component.request_register_org.controls.admin_name.valid).toBeFalsy();
  });


  it("Empty admin surname expect email admin surname invalid", () => {
    component.request_register_org.controls.organization_name.setValue("TestOrg");
    component.request_register_org.controls.admin_name.setValue("TesterFName");
    component.request_register_org.controls.admin_surname.setValue("");
    component.request_register_org.controls.admin_email.setValue("");
    component.request_register_org.controls.admin_phone.setValue("");

    expect(component.request_register_org.controls.admin_surname.valid).toBeFalsy();
  });

  it("Empty admin email expect email admin email invalid", () => {
    component.request_register_org.controls.organization_name.setValue("TestOrg");
    component.request_register_org.controls.admin_name.setValue("TesterFName");
    component.request_register_org.controls.admin_surname.setValue("TesterLName");
    component.request_register_org.controls.admin_email.setValue("");
    component.request_register_org.controls.admin_phone.setValue("");

    expect(component.request_register_org.controls.admin_email.valid).toBeFalsy();
  });

  it("Empty admin phone expect email admin phone invalid", () => {
    component.request_register_org.controls.organization_name.setValue("TestOrg");
    component.request_register_org.controls.admin_name.setValue("TesterFName");
    component.request_register_org.controls.admin_surname.setValue("TesterLName");
    component.request_register_org.controls.admin_email.setValue("tester@gmail.com");
    component.request_register_org.controls.admin_phone.setValue("");

    expect(component.request_register_org.controls.admin_phone.valid).toBeFalsy();
  });


  it("Valid request expect true", () => {
    component.request_register_org.controls.organization_name.setValue("TestOrg");
    component.request_register_org.controls.admin_name.setValue("TesterFName");
    component.request_register_org.controls.admin_surname.setValue("TesterLName");
    component.request_register_org.controls.admin_email.setValue("tester@gmail.com");
    component.request_register_org.controls.admin_phone.setValue("0000000000");

    expect(component.request_register_org.valid).toBeTruthy();
  });

});
