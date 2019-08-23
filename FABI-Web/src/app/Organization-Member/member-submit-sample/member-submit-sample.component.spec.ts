import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSubmitSampleComponent } from './member-submit-sample.component';

import { SampleFormComponent } from '../../sample-form/sample-form.component';

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


describe('MemberSubmitSampleComponent', () => {
  let component: MemberSubmitSampleComponent;
  let fixture: ComponentFixture<MemberSubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSubmitSampleComponent, SampleFormComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: []
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
