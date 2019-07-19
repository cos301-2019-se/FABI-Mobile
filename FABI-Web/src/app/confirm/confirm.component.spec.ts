import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmComponent } from './confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
//Import form components
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { MaterialModule} from '../materials';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, BrowserAnimationsModule 
     ],
      declarations: [ ConfirmComponent ],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
