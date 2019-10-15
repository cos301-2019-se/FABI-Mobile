import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormComponent } from './sample-form.component';

import { MapsWindowComponent } from '../maps-window/maps-window.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { NotificationService } from '../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

describe('SampleFormComponent', () => {
  let component: SampleFormComponent;
  let fixture: ComponentFixture<SampleFormComponent>;

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
      declarations: [ SampleFormComponent, MapsWindowComponent ],
      imports: [ReactiveFormsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, AgmCoreModule.forRoot(), MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MapsAPILoader, useClass: MockMapsAPILoader },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
