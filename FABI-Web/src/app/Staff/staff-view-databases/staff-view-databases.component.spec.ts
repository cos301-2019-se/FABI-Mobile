import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewDatabasesComponent } from './staff-view-databases.component';

describe('StaffViewDatabasesComponent', () => {
  let component: StaffViewDatabasesComponent;
  let fixture: ComponentFixture<StaffViewDatabasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewDatabasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
