import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHandlerComponent } from './database-handler.component';

import {MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DatabaseHandlerComponent', () => {
  let component: DatabaseHandlerComponent;
  let fixture: ComponentFixture<DatabaseHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseHandlerComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule]
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
