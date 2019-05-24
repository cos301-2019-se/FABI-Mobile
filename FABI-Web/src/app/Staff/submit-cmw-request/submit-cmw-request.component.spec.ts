import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwRequestComponent } from './submit-cmw-request.component';

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


describe('SubmitCmwRequestComponent', () => {
  let component: SubmitCmwRequestComponent;
  let fixture: ComponentFixture<SubmitCmwRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRequestComponent ],
      imports: [MaterialModule, NoopAnimationsModule, BrowserAnimationsModule]
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
