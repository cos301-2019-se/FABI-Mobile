import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';
//Import form components
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Import the materials component
import { MaterialModule } from '../../materials';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule } from 'ngx-toastr';

import { MemberHelpComponent } from './member-help.component';

describe('MemberHelpComponent', () => {
  let component: MemberHelpComponent;
  let fixture: ComponentFixture<MemberHelpComponent>;
  let de: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ToastContainerModule,
        ToastrModule,
        ToastrComponentlessModule
      ],
      declarations: [ MemberHelpComponent ],
      providers: [
        { provide: ToastContainerModule, useValue: {} },
        { provide: ToastrModule, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHelpComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
