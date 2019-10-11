import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWindowComponent } from './maps-window.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../_services/notification.service';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
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
      imports: [ReactiveFormsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, AgmCoreModule.forRoot(), RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
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

  it('select Location', () => {
    let spy = spyOn(component, "getAddress");
    component.selectLocation({coords:{lat:11, lng:22}});
    expect(component.location.latitude).toEqual(11);
    expect(component.location.longitude).toEqual(22);
    expect(spy).toHaveBeenCalled();
  });

  it('change Map Type from roadmap to hybrid', () => {
    component.map_type = 'roadmap';
    component.changeMapType();
    expect(component.map_type).toEqual('hybrid');
  });

  it('change Map Type from hybrid to roadmap', () => {
    component.map_type = 'hybrid';
    component.changeMapType();
    expect(component.map_type).toEqual('roadmap');
  });

});
