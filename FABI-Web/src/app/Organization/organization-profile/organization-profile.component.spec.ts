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
});
