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

import { AdminHelpComponent } from './admin-help.component';

describe('AdminHelpComponent', () => {
  let component: AdminHelpComponent;
  let fixture: ComponentFixture<AdminHelpComponent>;
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
      declarations: [ AdminHelpComponent ],
      providers: [
        { provide: ToastContainerModule, useValue: {} },
        { provide: ToastrModule, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHelpComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
