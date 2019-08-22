import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwRevitalizationComponent } from './submit-cmw-revitalization.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';
import { AuthenticationService } from 'src/app/_services/authentication.service'

describe('SubmitCmwRevitalizationComponent', () => {
  let component: SubmitCmwRevitalizationComponent;
  let fixture: ComponentFixture<SubmitCmwRevitalizationComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRevitalizationComponent, FilterPipe ],
      imports: [
        MaterialModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCmwRevitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
