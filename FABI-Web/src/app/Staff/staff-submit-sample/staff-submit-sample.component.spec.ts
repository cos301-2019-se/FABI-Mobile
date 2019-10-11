import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSubmitSampleComponent } from './staff-submit-sample.component';
import { NotificationService } from '../../_services/notification.service';

import { SampleFormComponent } from '../../sample-form/sample-form.component';

import { MapsWindowComponent } from '../../maps-window/maps-window.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

describe('StaffSubmitSampleComponent', () => {
  let component: StaffSubmitSampleComponent;
  let fixture: ComponentFixture<StaffSubmitSampleComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  class MockMapsAPILoader {
    public load(): Promise<boolean> {
      return new Promise(() => {
        return true;
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSubmitSampleComponent, SampleFormComponent, MapsWindowComponent ],
      imports: [HttpClientTestingModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule,  AgmCoreModule.forRoot(), NoopAnimationsModule, BrowserAnimationsModule,MaterialModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        NotificationService, ToastrService,
        { provide: MapsAPILoader, useClass: MockMapsAPILoader },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
