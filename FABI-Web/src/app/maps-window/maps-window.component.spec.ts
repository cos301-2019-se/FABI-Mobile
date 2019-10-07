import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWindowComponent } from './maps-window.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AgmCoreModule, MapsAPILoader } from '@agm/core'

import {MatDialogModule} from '@angular/material/dialog';



describe('MapsWindowComponent', () => {
  let component: MapsWindowComponent;
  let fixture: ComponentFixture<MapsWindowComponent>;

  class MockMapsAPILoader {
    public load(): Promise<boolean> {
      return new Promise(() => {
        return true;
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsWindowComponent ],
      imports: [ReactiveFormsModule, AgmCoreModule.forRoot(), RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MapsAPILoader, useClass: MockMapsAPILoader },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
