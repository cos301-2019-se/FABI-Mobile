import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwRequestComponent } from './submit-cmw-request.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';
import { NotificationService } from '../../_services/notification.service';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';
import { AuthenticationService } from 'src/app/_services/authentication.service'

describe('SubmitCmwRequestComponent', () => {
  let component: SubmitCmwRequestComponent;
  let fixture: ComponentFixture<SubmitCmwRequestComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRequestComponent, FilterPipe ],
      imports: [MaterialModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      providers:[
        ToastrService,
        NotificationService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCmwRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
