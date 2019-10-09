import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSubmitSampleComponent } from './member-submit-sample.component';

import { SampleFormComponent } from '../../sample-form/sample-form.component';

import { MapsWindowComponent } from '../../maps-window/maps-window.component';

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

import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

describe('MemberSubmitSampleComponent', () => {
  let component: MemberSubmitSampleComponent;
  let fixture: ComponentFixture<MemberSubmitSampleComponent>;

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
      declarations: [ MemberSubmitSampleComponent, SampleFormComponent, MapsWindowComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AgmCoreModule.forRoot()
      ],
      providers: [
        { provide: MapsAPILoader, useClass: MockMapsAPILoader },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
