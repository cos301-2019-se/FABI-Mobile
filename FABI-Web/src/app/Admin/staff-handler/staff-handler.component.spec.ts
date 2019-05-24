import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHandlerComponent } from './staff-handler.component';

import {MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffHandlerComponent', () => {
  let component: StaffHandlerComponent;
  let fixture: ComponentFixture<StaffHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHandlerComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
