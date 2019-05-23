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


describe('SubmitCmwRevitalizationComponent', () => {
  let component: SubmitCmwRevitalizationComponent;
  let fixture: ComponentFixture<SubmitCmwRevitalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRevitalizationComponent ],
      imports: [MaterialModule, NoopAnimationsModule, BrowserAnimationsModule]
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
