import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHandlerComponent } from './database-handler.component';

describe('DatabaseHandlerComponent', () => {
  let component: DatabaseHandlerComponent;
  let fixture: ComponentFixture<DatabaseHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
