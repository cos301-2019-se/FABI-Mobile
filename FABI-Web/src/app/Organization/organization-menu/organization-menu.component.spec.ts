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

import { OrganizationMenuComponent } from './organization-menu.component';

describe('OrganizationMenuComponent', () => {
  let component: OrganizationMenuComponent;
  let fixture: ComponentFixture<OrganizationMenuComponent>;
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
      declarations: [ OrganizationMenuComponent ],
      providers: [
        { provide: ToastContainerModule, useValue: {} },
        { provide: ToastrModule, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMenuComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
